# Solana Program Deployment Guide

## Step-by-Step Deployment to Devnet

### 1. Install Prerequisites

#### Install Rust (if not already installed)
```powershell
# Download and run rustup installer from:
# https://www.rust-lang.org/tools/install

# Or use Windows installer:
# https://win.rustup.rs/
```

#### Install Solana CLI (Windows)
```powershell
# Download Solana installer
cmd /c "curl https://release.solana.com/v1.18.0/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe"

# Run installer
C:\solana-install-tmp\solana-install-init.exe v1.18.0

# Add to PATH (restart terminal after)
$env:PATH += ";C:\Users\$env:USERNAME\.local\share\solana\install\active_release\bin"
```

### 2. Configure Solana CLI

```powershell
# Set to devnet
solana config set --url https://api.devnet.solana.com

# Create keypair (if you don't have one)
solana-keygen new --outfile C:\Users\$env:USERNAME\.config\solana\devnet.json

# Set as default keypair
solana config set --keypair C:\Users\$env:USERNAME\.config\solana\devnet.json

# Check configuration
solana config get
```

### 3. Get Devnet SOL

```powershell
# Request airdrop (2 SOL)
solana airdrop 2

# Check balance
solana balance
```

### 4. Build the Program

```powershell
cd "c:\Users\kushw\Downloads\Job & Networking Portal\solana-program"

# Build BPF program
cargo build-bpf
```

Expected output:
```
To deploy this program:
  $ solana program deploy target\deploy\job_portal_program.so
The program address will default to this keypair (override with --program-id):
  target\deploy\job_portal_program-keypair.json
```

### 5. Deploy to Devnet

```powershell
# Deploy the program
solana program deploy target\deploy\job_portal_program.so
```

Expected output:
```
Program Id: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

**SAVE THIS PROGRAM ID!** You'll need it for your frontend.

### 6. Verify Deployment

```powershell
# Check program account (replace with your Program ID)
solana program show 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

### 7. Update Frontend Configuration

Add to `frontend/.env`:
```env
REACT_APP_PROGRAM_ID=YOUR_DEPLOYED_PROGRAM_ID
```

## Alternative: Use Git Bash (Easier on Windows)

If you have Git for Windows installed:

```bash
cd /c/Users/kushw/Downloads/Job\ \&\ Networking\ Portal/solana-program

# Build
cargo build-bpf

# Deploy
solana program deploy target/deploy/job_portal_program.so
```

## Troubleshooting

### Issue: "cargo: command not found"
**Solution**: Restart terminal after installing Rust, or add to PATH manually

### Issue: "Insufficient funds"
**Solution**: Request more airdrops
```powershell
solana airdrop 2
```

### Issue: Build fails with BPF errors
**Solution**: Install Solana platform tools
```powershell
cargo install solana-cli
```

### Issue: Can't find cargo-build-bpf
**Solution**: 
```powershell
solana install
```

## What This Smart Contract Does

1. **CreateJob**: Employer pays job fee → funds locked in program escrow
2. **CompleteJob**: Employer releases payment → freelancer receives funds
3. **CancelJob**: Employer cancels job → gets refund from escrow

## Submit This to RizeOS

After deployment, provide:

1. **Source Code**: All files in `solana-program/` folder
2. **Deployed Address**: The Program ID from deployment
3. **Network**: Solana Devnet
4. **Verification**: Link to Solana Explorer: `https://explorer.solana.com/address/YOUR_PROGRAM_ID?cluster=devnet`

## Example Deployment Output to Include

```
Program Id: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
Network: Devnet
Explorer: https://explorer.solana.com/address/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU?cluster=devnet
```
