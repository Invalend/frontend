import React, { useState } from 'react';
import { useTradingHooks, useRestrictedWalletBalance } from './hooks';
import { TOKENS, SLIPPAGE_OPTIONS, TRADING_CONFIG } from './constants';
import { 
  calculateMinAmountOut, 
  calculateUSDValue, 
  calculateMarginRequired,
  validateTradeAmount,
  hasSufficientBalance,
  formatTokenAmount,
  getRecommendedFeeTier
} from './utils';
import type { TradeType, Token } from './constants';

export const TradingPage: React.FC = () => {
  const [selectedTokenIn, setSelectedTokenIn] = useState<string>('USDC');
  const [selectedTokenOut, setSelectedTokenOut] = useState<string>('LSK');
  const [tradeAmount, setTradeAmount] = useState<string>('');
  const [tradeType, setTradeType] = useState<TradeType>('buy');
  const [slippage, setSlippage] = useState<string>('0.5');
  const [estimatedOutput, setEstimatedOutput] = useState<string>('0');

  const {
    address,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hasActiveLoan,
    userBalance, // This is the main wallet USDC balance for margin
    restrictedWalletAddress,
    createLoan,
    approveMargin,
    executeSwap,
    canCreateLoan,
    isLoadingLoanInfo, // Add this to check loading state
  } = useTradingHooks();

  // Get token objects
  const tokenIn = TOKENS[selectedTokenIn];
  const tokenOut = TOKENS[selectedTokenOut];
  
  // Calculate values using utility functions
  const marginRequired = calculateMarginRequired(tradeAmount);
  const hasInsufficientBalance = !hasSufficientBalance(userBalance, marginRequired);
  const leverageMultiplier = TRADING_CONFIG.MAX_LEVERAGE;
  const tradeValidation = validateTradeAmount(tradeAmount);
  const recommendedFeeTier = getRecommendedFeeTier(tokenIn, tokenOut);
  
  // Get restricted wallet token balances (these are what user will trade with)
  const { data: restrictedTokenInBalance } = useRestrictedWalletBalance(tokenIn.address, restrictedWalletAddress);
  const { data: restrictedTokenOutBalance } = useRestrictedWalletBalance(tokenOut.address, restrictedWalletAddress);

  // Debug logging
  console.log('Trading Page Debug:', {
    hasActiveLoan,
    restrictedWalletAddress,
    address,
    isConnected
  });

  // Calculate estimated output using utility function
  const calculateEstimatedOutput = () => {
    if (!tradeAmount || !tokenIn.price || !tokenOut.price) return '0';
    
    return calculateMinAmountOut(tradeAmount, tokenIn, tokenOut, parseFloat(slippage));
  };

  const handleCreateLoan = async () => {
    if (!tradeAmount) return;
    
    try {
      await createLoan(tradeAmount);
    } catch (err) {
      console.error('Error creating loan:', err);
    }
  };

  const handleApproveMargin = async () => {
    if (!marginRequired) return;
    
    try {
      await approveMargin(marginRequired);
    } catch (err) {
      console.error('Error approving margin:', err);
    }
  };

  // Debug logging
  React.useEffect(() => {
    console.log('TradingPage Debug:', {
      address,
      isConnected,
      hasActiveLoan,
      restrictedWalletAddress,
      isLoadingLoanInfo
    });
  }, [address, isConnected, hasActiveLoan, restrictedWalletAddress, isLoadingLoanInfo]);

  const handleExecuteSwap = async () => {
    if (!tradeAmount || !estimatedOutput || !restrictedWalletAddress) return;
    
    // Check if restricted wallet has sufficient balance for the trade
    const restrictedBalanceFormatted = restrictedTokenInBalance 
      ? formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals) 
      : '0';
    
    if (parseFloat(restrictedBalanceFormatted) < parseFloat(tradeAmount)) {
      console.error('Insufficient balance in restricted wallet');
      return;
    }
    
    try {
      // Note: executeSwap signature changed to only take 3 parameters
      await executeSwap(tokenIn, tokenOut, tradeAmount);
    } catch (err) {
      console.error('Error executing swap:', err);
    }
  };

  const swapTokens = () => {
    setSelectedTokenIn(selectedTokenOut);
    setSelectedTokenOut(selectedTokenIn);
  };

  // Update estimated output when inputs change
  React.useEffect(() => {
    setEstimatedOutput(calculateEstimatedOutput());
  }, [tradeAmount, selectedTokenIn, selectedTokenOut, slippage]);

  const tokens = Object.values(TOKENS);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Uniswap Trading</h1>
        <p className="text-gray-400">Trade tokens with {leverageMultiplier}x leverage using your restricted wallet</p>
        
        {isLoadingLoanInfo ? (
          <div className="mt-3 p-3 bg-blue-900/30 border border-blue-600/50 rounded-lg">
            <p className="text-blue-400 text-sm font-medium">
              🔄 Loading loan information...
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Checking for active loans and restricted wallets
            </p>
          </div>
        ) : restrictedWalletAddress && hasActiveLoan ? (
          <div className="mt-3 p-3 bg-teal-900/30 border border-teal-600/50 rounded-lg">
            <p className="text-teal-400 text-sm font-medium">
              🔒 Trading Wallet: {restrictedWalletAddress.slice(0, 6)}...{restrictedWalletAddress.slice(-4)}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              All trades execute from your secure restricted wallet
            </p>
          </div>
        ) : hasActiveLoan && !restrictedWalletAddress ? (
          <div className="mt-3 p-3 bg-orange-900/30 border border-orange-600/50 rounded-lg">
            <p className="text-orange-400 text-sm font-medium">
              🔄 Loading restricted wallet...
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Your loan is active, fetching wallet address
            </p>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium">
              ⚠️ No active trading wallet
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Create a loan to get your restricted wallet for trading
            </p>
          </div>
        )}
        
        {recommendedFeeTier && (
          <p className="text-gray-400 text-xs mt-2">
            Recommended fee tier: {recommendedFeeTier} ({tokenIn.symbol}/{tokenOut.symbol})
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trading Form */}
        <div className="lg:col-span-2">
          <div className="bg-dark-gray border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Trade Tokens</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${
                    tradeType === 'buy'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${
                    tradeType === 'sell'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Token Swap Interface */}
              <div className="space-y-4">
                {/* From Token */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">From</label>
                    {restrictedTokenInBalance && (
                      <span className="text-sm text-gray-400">
                        Balance: {formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals)} {tokenIn.symbol}
                      </span>
                    )}
                    {!restrictedWalletAddress && (
                      <span className="text-sm text-red-400">
                        Create loan first to get restricted wallet
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={selectedTokenIn}
                      onChange={(e) => setSelectedTokenIn(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol} - {token.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(e.target.value)}
                      placeholder="0.0"
                      className="flex-1 bg-transparent text-white text-xl font-semibold placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ≈ ${tradeAmount || '0.00'} USD
                  </div>
                  {!tradeValidation.isValid && tradeAmount && (
                    <div className="text-red-400 text-sm mt-1">
                      {tradeValidation.error}
                    </div>
                  )}
                  {restrictedWalletAddress && restrictedTokenInBalance && tradeAmount && (
                    (() => {
                      const restrictedBalance = formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals);
                      const hasInsufficientRestrictedBalance = parseFloat(restrictedBalance) < parseFloat(tradeAmount);
                      return hasInsufficientRestrictedBalance && (
                        <div className="text-red-400 text-sm mt-1">
                          Insufficient {tokenIn.symbol} in restricted wallet. Available: {restrictedBalance}
                        </div>
                      );
                    })()
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={swapTokens}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors focus-ring"
                  >
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                {/* To Token */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-300">To</label>
                    {restrictedTokenOutBalance && (
                      <span className="text-sm text-gray-400">
                        Balance: {formatTokenAmount(restrictedTokenOutBalance as bigint, tokenOut.decimals)} {tokenOut.symbol}
                      </span>
                    )}
                    {!restrictedWalletAddress && (
                      <span className="text-sm text-red-400">
                        Create loan first to get restricted wallet
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={selectedTokenOut}
                      onChange={(e) => setSelectedTokenOut(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol} - {token.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex-1 text-white text-xl font-semibold">
                      {estimatedOutput}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ≈ ${calculateUSDValue(estimatedOutput, tokenOut)} USD
                  </div>
                </div>
              </div>

              {/* Slippage Control */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Slippage Tolerance (%)
                </label>
                <div className="flex items-center space-x-2">
                  {SLIPPAGE_OPTIONS.map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors focus-ring ${
                        slippage === value
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-white text-sm focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-colors"
                    step="0.1"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Summary */}
        <TradeSummary
          tradeAmount={tradeAmount}
          marginRequired={marginRequired}
          userBalance={userBalance}
          slippage={slippage}
          estimatedOutput={estimatedOutput}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          leverageMultiplier={leverageMultiplier}
          hasActiveLoan={hasActiveLoan}
          hasInsufficientBalance={hasInsufficientBalance}
          restrictedWalletAddress={restrictedWalletAddress}
          restrictedTokenInBalance={restrictedTokenInBalance}
          isConnected={isConnected}
          error={error}
          canCreateLoan={canCreateLoan(tradeAmount)}
          tradeValidation={tradeValidation}
          onCreateLoan={handleCreateLoan}
          onApproveMargin={handleApproveMargin}
          onExecuteSwap={handleExecuteSwap}
          isPending={isPending}
          isConfirming={isConfirming}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
};

// Trade Summary Component
interface TradeSummaryProps {
  tradeAmount: string;
  marginRequired: string;
  userBalance: string;
  slippage: string;
  estimatedOutput: string;
  tokenIn: Token;
  tokenOut: Token;
  leverageMultiplier: number;
  hasActiveLoan: boolean;
  hasInsufficientBalance: boolean;
  restrictedWalletAddress: string | null;
  restrictedTokenInBalance: bigint | undefined;
  isConnected: boolean;
  error: unknown;
  canCreateLoan: boolean;
  tradeValidation: { isValid: boolean; error?: string };
  onCreateLoan: () => void;
  onApproveMargin: () => void;
  onExecuteSwap: () => void;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
}

const TradeSummary: React.FC<TradeSummaryProps> = ({
  tradeAmount,
  marginRequired,
  userBalance,
  slippage,
  estimatedOutput,
  tokenIn,
  tokenOut,
  leverageMultiplier,
  hasActiveLoan,
  hasInsufficientBalance,
  restrictedWalletAddress,
  restrictedTokenInBalance,
  isConnected,
  error,
  canCreateLoan,
  tradeValidation,
  onCreateLoan,
  onApproveMargin,
  onExecuteSwap,
  isPending,
  isConfirming,
  isSuccess,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-dark-gray rounded-xl p-6 border border-gray-700 sticky top-6">
        <h3 className="text-lg font-semibold text-white mb-4">Trade Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Position Size</span>
            <span className="text-white">${tradeAmount || '0.00'}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Margin Required (20%)</span>
            <span className="text-white">${marginRequired} USDC</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Leverage</span>
            <span className="text-teal-400">{leverageMultiplier}x</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Main Wallet Balance</span>
            <span className="text-white">${userBalance} USDC</span>
          </div>
          
          {restrictedWalletAddress && restrictedTokenInBalance && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Trading Balance</span>
              <span className="text-teal-400">
                {formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals)} {tokenIn.symbol}
              </span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Slippage Tolerance</span>
            <span className="text-white">{slippage}%</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Output</span>
            <span className="text-teal-400">{estimatedOutput} {tokenOut.symbol}</span>
          </div>
          
          <div className="pt-3 border-t border-gray-700">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-300">Est. Value</span>
              <span className="text-teal-400">
                ${calculateUSDValue(estimatedOutput, tokenOut)}
              </span>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {!tradeValidation.isValid && tradeAmount && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-600 rounded-lg">
            <p className="text-red-300 text-sm">{tradeValidation.error}</p>
          </div>
        )}

        {!isConnected && (
          <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg">
            <p className="text-yellow-300 text-sm">Please connect your wallet to trade</p>
          </div>
        )}

        {hasInsufficientBalance && isConnected && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-600 rounded-lg">
            <p className="text-red-300 text-sm">Insufficient USDC balance for margin requirement</p>
          </div>
        )}

        {restrictedWalletAddress && restrictedTokenInBalance && tradeAmount && (
          (() => {
            const restrictedBalance = formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals);
            const hasInsufficientRestrictedBalance = parseFloat(restrictedBalance) < parseFloat(tradeAmount);
            return hasInsufficientRestrictedBalance && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-600 rounded-lg">
                <p className="text-red-300 text-sm">
                  Insufficient {tokenIn.symbol} in restricted wallet. Available: {restrictedBalance} {tokenIn.symbol}
                </p>
              </div>
            );
          })()
        )}

        {hasActiveLoan && !restrictedWalletAddress && (
          <div className="mt-4 p-3 bg-blue-900/50 border border-blue-600 rounded-lg">
            <p className="text-blue-300 text-sm">You have an active loan. Use it to trade or close it first.</p>
          </div>
        )}

        {Boolean(isSuccess) && (
          <div className="mt-4 p-3 bg-green-900/50 border border-green-600 rounded-lg">
            <p className="text-green-300 text-sm">Transaction successful!</p>
          </div>
        )}

        {Boolean(error) && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-600 rounded-lg">
            <p className="text-red-300 text-sm">
              Error: {(error as Error)?.message || 'Unknown error occurred'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {!hasActiveLoan && canCreateLoan && (
            <>
              <button
                onClick={onApproveMargin}
                disabled={!tradeAmount || isPending || isConfirming}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-colors focus-ring"
              >
                {isPending ? 'Approving...' : 'Approve USDC'}
              </button>
              
              <button
                onClick={onCreateLoan}
                disabled={!tradeAmount || isPending || isConfirming}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-colors focus-ring"
              >
                {isPending ? 'Creating...' : isConfirming ? 'Confirming...' : 'Create Loan & Position'}
              </button>
            </>
          )}

          {restrictedWalletAddress && (() => {
            const restrictedBalance = restrictedTokenInBalance 
              ? formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals) 
              : '0';
            const hasInsufficientRestrictedBalance = parseFloat(restrictedBalance) < parseFloat(tradeAmount || '0');
            
            return (
              <button
                onClick={onExecuteSwap}
                disabled={!tradeAmount || !estimatedOutput || isPending || isConfirming || hasInsufficientRestrictedBalance || !restrictedWalletAddress}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-colors focus-ring"
              >
                {isPending ? 'Swapping...' : isConfirming ? 'Confirming...' : 'Execute Swap'}
              </button>
            );
          })()}
          
          {!canCreateLoan && isConnected && tradeAmount && !hasActiveLoan && (
            <button
              disabled
              className="w-full bg-gray-600 cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold"
            >
              Insufficient Collateral or Invalid Amount
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
