import React from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { RESTRICTED_WALLET_ABI } from '@/abis/restricted-wallet-abi';
import { UNISWAP_V3_ROUTER, TRADING_CONFIG } from './constants';
import type { Token } from './constants';

// Type definition for LoanInfo tuple structure
type LoanInfo = readonly [
  bigint, // loanAmount
  bigint, // marginAmount  
  bigint, // poolFunding
  number, // startTime
  string, // restrictedWallet
  boolean // isActive
];

// Custom hook for restricted wallet balance
export const useRestrictedWalletBalance = (tokenAddress: string, restrictedWalletAddress: string | null) => {
  return useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
      },
    ],
    functionName: 'balanceOf',
    args: restrictedWalletAddress ? [restrictedWalletAddress as `0x${string}`] : undefined,
    query: { enabled: !!restrictedWalletAddress && tokenAddress !== '0x0000000000000000000000000000000000000000' },
  });
};

export const useTradingHooks = () => {
  const { address, isConnected } = useAccount();

  // Smart contract hooks
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Read user's loan info
  const { data: loanInfo, refetch: refetchLoanInfo, error: loanInfoError, isLoading: isLoadingLoanInfo } = useReadContract({
    ...CONTRACT_CONFIGS.LOAN_MANAGER,
    functionName: 'getLoanInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  }) as { data: LoanInfo | undefined; refetch: () => void; error: unknown; isLoading: boolean };

  // Debug loan info error
  if (loanInfoError) {
    console.error('Loan Info Error:', loanInfoError);
  }

  // Read user's USDC balance
  const { data: usdcBalance, refetch: refetchUsdcBalance } = useReadContract({
    ...CONTRACT_CONFIGS.MOCK_USDC,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Get restricted wallet address from loan info with better validation
  const restrictedWalletAddress = React.useMemo(() => {
    if (!loanInfo) {
      console.log('No loan info available');
      return null;
    }
    
    const isActive = loanInfo[5];
    const walletAddress = loanInfo[4];
    
    console.log('Loan validation:', {
      isActive,
      walletAddress,
      isValidAddress: walletAddress && walletAddress !== '0x0000000000000000000000000000000000000000'
    });
    
    if (!isActive) {
      console.log('Loan is not active');
      return null;
    }
    
    if (!walletAddress || walletAddress === '0x0000000000000000000000000000000000000000') {
      console.log('Invalid wallet address');
      return null;
    }
    
    return walletAddress;
  }, [loanInfo]);

  // Create loan function
  const createLoan = async (loanAmount: string) => {
    if (!address || !loanAmount || !isConnected) {
      throw new Error('Missing required parameters');
    }

    try {
      const loanAmountWei = parseUnits(loanAmount, 6);
      
      await writeContract({
        ...CONTRACT_CONFIGS.LOAN_MANAGER,
        functionName: 'createLoan',
        args: [loanAmountWei],
      });
    } catch (err) {
      throw err;
    }
  };

  // Approve margin function
  const approveMargin = async (marginAmount: string) => {
    if (!address || !marginAmount || !isConnected) {
      throw new Error('Missing required parameters');
    }

    try {
      const marginAmountWei = parseUnits(marginAmount, 6);
      
      await writeContract({
        ...CONTRACT_CONFIGS.MOCK_USDC,
        functionName: 'approve',
        args: [CONTRACT_CONFIGS.LOAN_MANAGER.address, marginAmountWei],
      });
    } catch (err) {
      throw err;
    }
  };

  // Execute swap function
  const executeSwap = async (
    tokenIn: Token,
    tokenOut: Token,
    amount: string
    // slippage parameter removed as it's not used in current implementation
  ) => {
    if (!restrictedWalletAddress || !address || !amount) {
      throw new Error('Missing required parameters for swap');
    }

    try {
      // For now, just call execute with minimal data
      // In real implementation, this would need proper Uniswap swap encoding
      await writeContract({
        address: restrictedWalletAddress as `0x${string}`,
        abi: RESTRICTED_WALLET_ABI,
        functionName: 'execute',
        args: [
          UNISWAP_V3_ROUTER as `0x${string}`, // target
          '0x' as `0x${string}` // data - this would need to be encoded swap data in real implementation
        ],
      });
    } catch (err) {
      throw err;
    }
  };

  // Get restricted wallet balances for tokens
  // Note: Components should use useRestrictedWalletBalance hook directly
  // with restrictedWalletAddress from this hook

  // Check if user can create loan
  const canCreateLoan = (tradeAmount: string) => {
    if (!address || !tradeAmount) return false;
    
    const marginRequired = parseFloat(tradeAmount) * TRADING_CONFIG.MARGIN_REQUIREMENT;
    const userBalance = usdcBalance ? parseFloat(formatUnits(usdcBalance as bigint, 6)) : 0;
    const hasActiveLoan = loanInfo ? loanInfo[5] : false;
    
    return !hasActiveLoan && userBalance >= marginRequired && parseFloat(tradeAmount) >= TRADING_CONFIG.MIN_TRADE_AMOUNT;
  };

  // Update data on successful transactions
  React.useEffect(() => {
    if (isSuccess) {
      refetchLoanInfo();
      refetchUsdcBalance();
    }
  }, [isSuccess, refetchLoanInfo, refetchUsdcBalance]);

  // Computed values
  const hasActiveLoan = loanInfo ? loanInfo[5] : false;
  const userBalance = usdcBalance ? formatUnits(usdcBalance as bigint, 6) : '0';

  return {
    address,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hasActiveLoan,
    userBalance,
    restrictedWalletAddress,
    loanInfo,
    refetchLoanInfo,
    refetchUsdcBalance,
    createLoan,
    approveMargin,
    executeSwap,
    canCreateLoan,
    isLoadingLoanInfo,
  };
};