#!/bin/bash

echo "Deploying JobNest Solana Program to Devnet..."

# Check if built
if [ ! -f "target/deploy/job_portal_program.so" ]; then
    echo "Program not built. Building now..."
    cargo build-bpf
fi

# Set devnet
solana config set --url https://api.devnet.solana.com

# Check balance
BALANCE=$(solana balance)
echo "Current balance: $BALANCE"

if [ "$BALANCE" == "0 SOL" ]; then
    echo "Requesting airdrop..."
    solana airdrop 2
    sleep 5
fi

# Deploy
echo ""
echo "Deploying program..."
PROGRAM_OUTPUT=$(solana program deploy target/deploy/job_portal_program.so)

echo "$PROGRAM_OUTPUT"

# Extract and save program ID
PROGRAM_ID=$(echo "$PROGRAM_OUTPUT" | grep -oP 'Program Id: \K[A-Za-z0-9]+')

if [ ! -z "$PROGRAM_ID" ]; then
    echo ""
    echo "=========================================="
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo "=========================================="
    echo "Program ID: $PROGRAM_ID"
    echo ""
    echo "Saving to program-id.txt..."
    echo "$PROGRAM_ID" > program-id.txt
    echo ""
    echo "Update your frontend .env file:"
    echo "REACT_APP_PROGRAM_ID=$PROGRAM_ID"
fi
