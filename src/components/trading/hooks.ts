import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { CONTRACT_CONFIGS } from '@/config/contracts';
import { RESTRICTED_WALLET_ABI } from '@/abis/restricted-wallet-abi';
import { TRADING_CONFIG } from './constants';
import { prepareSwapParams, isTokenPairSupported } from './v4-utils';
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
    query: { 
      enabled: !!restrictedWalletAddress && 
               !!tokenAddress && 
               tokenAddress !== '' && 
               tokenAddress !== '0x0000000000000000000000000000000000000000' 
    },
  });
};

export const useTradingHooks = () => {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<'idle' | 'approve' | 'create' | 'swap' | 'success'>('idle');
  const [error, setError] = useState<string>('');

  // Smart contract hooks
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, isError: isTxError } = useWaitForTransactionReceipt({
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
    
    // Handle both array and object formats
    const isActive = Array.isArray(loanInfo) ? loanInfo[5] : (loanInfo as unknown as { isActive: boolean }).isActive;
    const walletAddress = Array.isArray(loanInfo) ? loanInfo[4] : (loanInfo as unknown as { restrictedWallet: string }).restrictedWallet;
    
    console.log('Loan validation:', {
      isActive,
      walletAddress,
      isValidAddress: walletAddress && walletAddress !== '0x0000000000000000000000000000000000000000',
      loanInfoType: Array.isArray(loanInfo) ? 'array' : 'object'
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

    setCurrentStep('create');
    setError('');
    try {
      const loanAmountWei = parseUnits(loanAmount, 6);
      
      await writeContract({
        ...CONTRACT_CONFIGS.LOAN_MANAGER,
        functionName: 'createLoan',
        args: [loanAmountWei],
      });
    } catch (err) {
      setCurrentStep('idle');
      throw err;
    }
  };

  // Approve margin function
  const approveMargin = async (marginAmount: string) => {
    if (!address || !marginAmount || !isConnected) {
      throw new Error('Missing required parameters');
    }

    setCurrentStep('approve');
    setError('');
    try {
      const marginAmountWei = parseUnits(marginAmount, 6);
      
      await writeContract({
        ...CONTRACT_CONFIGS.MOCK_USDC,
        functionName: 'approve',
        args: [CONTRACT_CONFIGS.LOAN_MANAGER.address, marginAmountWei],
      });
    } catch (err) {
      setCurrentStep('idle');
      throw err;
    }
  };

  // Execute swap function
  const executeSwap = async (
    tokenIn: Token,
    tokenOut: Token,
    amount: string,
    slippagePercent: number = 0.5
  ) => {
    console.log('executeSwap called with:', {
      restrictedWalletAddress,
      address,
      amount,
      tokenIn: tokenIn?.symbol,
      tokenOut: tokenOut?.symbol,
      slippagePercent
    });

    if (!restrictedWalletAddress || !address || !amount) {
      console.error('Missing required parameters:', {
        restrictedWalletAddress: !!restrictedWalletAddress,
        address: !!address,
        amount: !!amount
      });
      throw new Error('Missing required parameters for swap');
    }

    // Check if token pair is supported
    if (!isTokenPairSupported(tokenIn, tokenOut)) {
      throw new Error(`Token pair ${tokenIn.symbol}/${tokenOut.symbol} is not supported`);
    }

    setCurrentStep('swap');
    setError('');
    try {
      // Prepare swap parameters
      const swapParams = prepareSwapParams(tokenIn, tokenOut, amount, slippagePercent);
      if (!swapParams) {
        throw new Error('Failed to prepare swap parameters');
      }

      // Execute swap directly through restricted wallet's swapExactInputSingleV4 function
      await writeContract({
        address: restrictedWalletAddress as `0x${string}`,
        abi: RESTRICTED_WALLET_ABI,
        functionName: 'swapExactInputSingleV4',
        args: [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          swapParams.poolKey as any, // PoolKey struct for wagmi
          swapParams.amountIn,
          swapParams.amountOutMinimum,
          swapParams.deadline
        ],
      });
    } catch (err) {
      setCurrentStep('idle');
      console.error('Swap error:', err);
      throw err;
    }
  };

  // Whitelist tokens function
  const whitelistTokens = async () => {
    if (!restrictedWalletAddress || !isConnected) {
      throw new Error('Missing required parameters for whitelist');
    }

    setCurrentStep('approve'); // Reuse approve step for whitelist
    setError('');
    try {
      // Get token addresses
      const usdcAddress = CONTRACT_CONFIGS.MOCK_USDC.address;
      const ethAddress = CONTRACT_CONFIGS.MOCK_ETH.address;
      const btcAddress = CONTRACT_CONFIGS.MOCK_BTC.address;

      // Prepare token array for batch whitelist
      const tokens = [usdcAddress, ethAddress, btcAddress];

      // Call batch whitelist function
      await writeContract({
        address: restrictedWalletAddress as `0x${string}`,
        abi: RESTRICTED_WALLET_ABI,
        functionName: 'addWhitelistedTokensBatch',
        args: [tokens],
      });
    } catch (err) {
      setCurrentStep('idle');
      console.error('Whitelist error:', err);
      throw err;
    }
  };

  // Get restricted wallet balances for tokens
  // Note: Components should use useRestrictedWalletBalance hook directly
  // with restrictedWalletAddress from this hook

  // Check whitelist status for tokens
  const { data: usdcWhitelisted } = useReadContract({
    address: restrictedWalletAddress as `0x${string}`,
    abi: RESTRICTED_WALLET_ABI,
    functionName: 'isTokenWhitelisted',
    args: [CONTRACT_CONFIGS.MOCK_USDC.address],
    query: {
      enabled: !!restrictedWalletAddress,
    },
  });

  const { data: ethWhitelisted } = useReadContract({
    address: restrictedWalletAddress as `0x${string}`,
    abi: RESTRICTED_WALLET_ABI,
    functionName: 'isTokenWhitelisted',
    args: [CONTRACT_CONFIGS.MOCK_ETH.address],
    query: {
      enabled: !!restrictedWalletAddress,
    },
  });

  const { data: btcWhitelisted } = useReadContract({
    address: restrictedWalletAddress as `0x${string}`,
    abi: RESTRICTED_WALLET_ABI,
    functionName: 'isTokenWhitelisted',
    args: [CONTRACT_CONFIGS.MOCK_BTC.address],
    query: {
      enabled: !!restrictedWalletAddress,
    },
  });

  // Check if all tokens are whitelisted
  const allTokensWhitelisted = usdcWhitelisted && ethWhitelisted && btcWhitelisted;

  // Check if user can create loan
  const canCreateLoan = (tradeAmount: string) => {
    if (!address || !tradeAmount) return false;
    
    const marginRequired = parseFloat(tradeAmount) * TRADING_CONFIG.MARGIN_REQUIREMENT;
    const userBalance = usdcBalance ? parseFloat(formatUnits(usdcBalance as bigint, 6)) : 0;
    const hasActiveLoan = loanInfo ? loanInfo[5] : false;
    
    return !hasActiveLoan && userBalance >= marginRequired && parseFloat(tradeAmount) >= TRADING_CONFIG.MIN_TRADE_AMOUNT;
  };

  // Effects for step management
  useEffect(() => {
    if (isSuccess) {
      if (currentStep === 'approve') {
        setCurrentStep('create');
      } else if (currentStep === 'create') {
        setCurrentStep('swap');
      } else if (currentStep === 'swap') {
        setCurrentStep('success');
      }
      refetchLoanInfo();
      refetchUsdcBalance();
      setError('');
    }
  }, [isSuccess, currentStep, refetchLoanInfo, refetchUsdcBalance]);

  useEffect(() => {
    if (isTxError || writeError) {
      setCurrentStep('idle');
      setError('Transaction failed. Please try again.');
    }
  }, [isTxError, writeError]);

  // Reset function
  const resetStates = () => {
    setCurrentStep('idle');
    setError('');
  };

  // Computed values
  const hasActiveLoan = loanInfo ? (Array.isArray(loanInfo) ? loanInfo[5] : (loanInfo as unknown as { isActive: boolean }).isActive) : false;
  const userBalance = usdcBalance ? formatUnits(usdcBalance as bigint, 6) : '0';

  return {
    address,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    error: error || writeError?.message || '',
    
    // Step Management
    currentStep,
    
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
    resetStates,
    
    // Whitelist functions
    whitelistTokens,
    usdcWhitelisted,
    ethWhitelisted,
    btcWhitelisted,
    allTokensWhitelisted,
  };
};