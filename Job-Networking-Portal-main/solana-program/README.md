# JobNest Solana Smart Contract

A Solana program for managing job posting payments with escrow functionality.

## Features

- **Create Job**: Employer creates job posting with payment held in escrow
- **Complete Job**: Employer releases payment to freelancer upon completion
- **Cancel Job**: Employer can cancel and get refund if job not completed

## Program Structure

```
JobPosting {
    employer: Pubkey,
    amount: u64,
    status: JobStatus (Active/Completed/Cancelled),
    job_id: String,
    created_at: i64,
}
```

## Building

### Prerequisites

1. Install Rust:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Install Solana CLI:
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

3. Configure for devnet:
```bash
solana config set --url https://api.devnet.solana.com
```

### Build the Program

```bash
cd solana-program
cargo build-bpf
```

## Deployment

### 1. Create a Keypair (if needed)

```bash
solana-keygen new --outfile ~/.config/solana/devnet.json
```

### 2. Get Devnet SOL

```bash
solana airdrop 2
```

### 3. Deploy to Devnet

```bash
solana program deploy target/deploy/job_portal_program.so
```

This will output your **Program ID** - save this address!

Example output:
```
Program Id: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

## Deployed Program Address

**Devnet Program ID**: `[WILL BE FILLED AFTER DEPLOYMENT]`

## Usage from Frontend

```javascript
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

// Create job with escrow
const createJobInstruction = {
  keys: [
    { pubkey: employerPubkey, isSigner: true, isWritable: true },
    { pubkey: jobPDA, isSigner: false, isWritable: true },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ],
  programId: new PublicKey('YOUR_PROGRAM_ID'),
  data: Buffer.from([0, ...job_id_bytes, ...amount_bytes]),
};
```

## Testing

```bash
cargo test-bpf
```

## Program Instructions

### 0: CreateJob
- Creates job posting with payment in escrow
- Requires: employer signature, job_id, amount

### 1: CompleteJob
- Releases payment to freelancer
- Requires: employer signature

### 2: CancelJob
- Refunds employer
- Requires: employer signature

## Security Features

- PDA-based account derivation prevents unauthorized access
- Employer signature required for all actions
- Status validation prevents double-spending
- Rent-exempt accounts ensure persistence

## License

MIT
