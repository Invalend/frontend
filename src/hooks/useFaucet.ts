"use client";

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_CONFIGS } from '@/config/contracts';

export const useFaucet = () => {
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);

  // Get USDC balance
  const { data: usdcBalance, refetch: refetchBalance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  // Mint transaction
  const { writeContract: mint, data: mintHash } = useWriteContract();
  const { isLoading: isMintingTx } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  const handleMint = async () => {
    if (!address) return;
    
    setIsMinting(true);
    try {
      // Mint 1000 USDC (1000 * 10^6 = 1,000,000,000)
      const amount = BigInt(1000 * 10**6);
      await mint({
        ...CONTRACT_CONFIGS.MOCK_USDC,
        functionName: 'mint',
        args: [address, amount],
        gas: BigInt(200000), // Set reasonable gas limit for mint
      });
    } catch (error) {
      console.error('Mint error:', error);
      setIsMinting(false);
    }
  };

  const resetStates = () => {
    setIsMinting(false);
  };

  return {
    usdcBalance,
    isMinting: isMinting || isMintingTx,
    handleMint,
    resetStates,
    refetchBalance,
    mintHash,
  };
}; 