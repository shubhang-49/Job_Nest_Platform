import React, { createContext, useState, useContext, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [balance, setBalance] = useState(0);

  const NETWORK = import.meta.env.VITE_SOLANA_NETWORK || 'devnet';
  const connection = new Connection(clusterApiUrl(NETWORK), 'confirmed');

  useEffect(() => {
    // Check if Phantom wallet is installed
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana?.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWallet(response.publicKey.toString());
          setConnected(true);
          await fetchBalance(response.publicKey);
        }
      } catch (error) {
        // Silently handle wallet connection errors on page load
        // User can manually connect wallet if needed
        if (error.code !== 4001) {
          // Only log non-user-rejection errors
          console.debug('Auto-connect skipped:', error.message);
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  const fetchBalance = async (publicKey) => {
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connectWallet = async () => {
    setConnecting(true);
    try {
      const { solana } = window;
      
      if (!solana) {
        alert('Please install Phantom wallet!');
        window.open('https://phantom.app/', '_blank');
        setConnecting(false);
        return { success: false, error: 'Phantom wallet not found' };
      }

      const response = await solana.connect();
      const publicKey = response.publicKey.toString();
      
      setWallet(publicKey);
      setConnected(true);
      await fetchBalance(response.publicKey);
      
      setConnecting(false);
      return { success: true, publicKey };
    } catch (error) {
      // Don't log user rejection errors (code 4001)
      if (error.code !== 4001) {
        console.error('Error connecting wallet:', error);
      }
      setConnecting(false);
      return { success: false, error: error.message };
    }
  };

  const disconnectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        setWallet(null);
        setConnected(false);
        setBalance(0);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const sendTransaction = async (recipientAddress, amount) => {
    try {
      const { solana } = window;
      if (!solana || !connected) {
        return { success: false, error: 'Wallet not connected' };
      }

      const transaction = new window.solanaWeb3.Transaction().add(
        window.solanaWeb3.SystemProgram.transfer({
          fromPubkey: new PublicKey(wallet),
          toPubkey: new PublicKey(recipientAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      transaction.feePayer = new PublicKey(wallet);
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;

      const signed = await solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signed.signature);

      // Refresh balance
      await fetchBalance(new PublicKey(wallet));

      return { 
        success: true, 
        signature: signed.signature,
        transactionId: signed.signature 
      };
    } catch (error) {
      console.error('Transaction error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  const payPlatformFee = async () => {
    const adminWallet = import.meta.env.VITE_ADMIN_WALLET;
    const platformFee = parseFloat(import.meta.env.VITE_PLATFORM_FEE || '0.0001');

    if (!adminWallet) {
      return { success: false, error: 'Admin wallet not configured' };
    }

    return await sendTransaction(adminWallet, platformFee);
  };

  const value = {
    wallet,
    connected,
    connecting,
    balance,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    payPlatformFee,
    refreshBalance: () => wallet && fetchBalance(new PublicKey(wallet)),
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
