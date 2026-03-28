use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

/// Define the program entrypoint
entrypoint!(process_instruction);

/// Job posting states
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, PartialEq)]
pub enum JobStatus {
    Active,
    Completed,
    Cancelled,
}

/// Job posting data structure
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct JobPosting {
    pub employer: Pubkey,
    pub amount: u64,
    pub status: JobStatus,
    pub job_id: String,
    pub created_at: i64,
}

/// Instruction enum
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum JobPortalInstruction {
    /// Create a new job posting with payment
    /// Accounts expected:
    /// 0. [signer, writable] Employer account
    /// 1. [writable] Job posting account (PDA)
    /// 2. [] System program
    CreateJob { job_id: String, amount: u64 },

    /// Complete job and release payment to freelancer
    /// Accounts expected:
    /// 0. [signer] Employer account
    /// 1. [writable] Job posting account (PDA)
    /// 2. [writable] Freelancer account
    /// 3. [] System program
    CompleteJob,

    /// Cancel job and refund employer
    /// Accounts expected:
    /// 0. [signer] Employer account
    /// 1. [writable] Job posting account (PDA)
    /// 2. [] System program
    CancelJob,
}

/// Program instruction processor
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = JobPortalInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        JobPortalInstruction::CreateJob { job_id, amount } => {
            msg!("Instruction: CreateJob");
            create_job(program_id, accounts, job_id, amount)
        }
        JobPortalInstruction::CompleteJob => {
            msg!("Instruction: CompleteJob");
            complete_job(program_id, accounts)
        }
        JobPortalInstruction::CancelJob => {
            msg!("Instruction: CancelJob");
            cancel_job(program_id, accounts)
        }
    }
}

/// Create job posting with escrow payment
fn create_job(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    job_id: String,
    amount: u64,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let employer = next_account_info(accounts_iter)?;
    let job_account = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    // Verify employer is signer
    if !employer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Create PDA for job posting
    let (pda, bump_seed) = Pubkey::find_program_address(
        &[b"job", job_id.as_bytes(), employer.key.as_ref()],
        program_id,
    );

    if pda != *job_account.key {
        msg!("Invalid PDA for job posting");
        return Err(ProgramError::InvalidAccountData);
    }

    // Calculate rent
    let rent = Rent::get()?;
    let space = 1000; // Enough space for JobPosting struct
    let rent_lamports = rent.minimum_balance(space);
    let total_lamports = rent_lamports + amount;

    // Create job posting account
    invoke_signed(
        &system_instruction::create_account(
            employer.key,
            job_account.key,
            total_lamports,
            space as u64,
            program_id,
        ),
        &[employer.clone(), job_account.clone(), system_program.clone()],
        &[&[b"job", job_id.as_bytes(), employer.key.as_ref(), &[bump_seed]]],
    )?;

    // Initialize job posting data
    let clock = solana_program::clock::Clock::get()?;
    let job_posting = JobPosting {
        employer: *employer.key,
        amount,
        status: JobStatus::Active,
        job_id: job_id.clone(),
        created_at: clock.unix_timestamp,
    };

    job_posting.serialize(&mut &mut job_account.data.borrow_mut()[..])?;

    msg!("Job created: {} with amount: {} lamports", job_id, amount);
    Ok(())
}

/// Complete job and release payment to freelancer
fn complete_job(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let employer = next_account_info(accounts_iter)?;
    let job_account = next_account_info(accounts_iter)?;
    let freelancer = next_account_info(accounts_iter)?;
    let _system_program = next_account_info(accounts_iter)?;

    // Verify employer is signer
    if !employer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Deserialize job posting
    let mut job_posting = JobPosting::try_from_slice(&job_account.data.borrow())?;

    // Verify employer owns this job
    if job_posting.employer != *employer.key {
        msg!("Only employer can complete job");
        return Err(ProgramError::IllegalOwner);
    }

    // Verify job is active
    if job_posting.status != JobStatus::Active {
        msg!("Job is not active");
        return Err(ProgramError::InvalidAccountData);
    }

    // Transfer payment to freelancer
    let amount = job_posting.amount;
    **job_account.try_borrow_mut_lamports()? -= amount;
    **freelancer.try_borrow_mut_lamports()? += amount;

    // Update job status
    job_posting.status = JobStatus::Completed;
    job_posting.serialize(&mut &mut job_account.data.borrow_mut()[..])?;

    msg!("Job completed, {} lamports transferred to freelancer", amount);
    Ok(())
}

/// Cancel job and refund employer
fn cancel_job(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let employer = next_account_info(accounts_iter)?;
    let job_account = next_account_info(accounts_iter)?;
    let _system_program = next_account_info(accounts_iter)?;

    // Verify employer is signer
    if !employer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // Deserialize job posting
    let mut job_posting = JobPosting::try_from_slice(&job_account.data.borrow())?;

    // Verify employer owns this job
    if job_posting.employer != *employer.key {
        msg!("Only employer can cancel job");
        return Err(ProgramError::IllegalOwner);
    }

    // Verify job is active
    if job_posting.status != JobStatus::Active {
        msg!("Job is not active");
        return Err(ProgramError::InvalidAccountData);
    }

    // Refund employer
    let amount = job_posting.amount;
    **job_account.try_borrow_mut_lamports()? -= amount;
    **employer.try_borrow_mut_lamports()? += amount;

    // Update job status
    job_posting.status = JobStatus::Cancelled;
    job_posting.serialize(&mut &mut job_account.data.borrow_mut()[..])?;

    msg!("Job cancelled, {} lamports refunded to employer", amount);
    Ok(())
}
