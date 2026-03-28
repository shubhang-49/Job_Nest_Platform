#!/bin/bash

echo "Building JobNest Solana Program..."

# Build the program
cargo build-bpf

echo ""
echo "Build complete!"
echo "To deploy to devnet, run:"
echo "  solana program deploy target/deploy/job_portal_program.so"
