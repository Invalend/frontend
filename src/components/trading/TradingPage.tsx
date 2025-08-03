import React, { useState } from "react";
import { useTradingHooks, useRestrictedWalletBalance } from "./hooks";
import { useUserLoanInfo } from "@/hooks/useLoan";
import { TransactionButton } from "@/components/common/TransactionButton";
import { TOKENS, SLIPPAGE_OPTIONS, TRADING_CONFIG } from "./constants";
import {
  calculateMinAmountOut,
  calculateUSDValue,
  calculateMarginRequired,
  validateTradeAmount,
  hasSufficientBalance,
  formatTokenAmount,
} from "./utils";
import type { Token } from "./constants";

export const TradingPage: React.FC = () => {
  const [selectedTokenIn, setSelectedTokenIn] = useState<string>("USDC");
  const [selectedTokenOut, setSelectedTokenOut] = useState<string>("LSK");
  const [tradeAmount, setTradeAmount] = useState<string>("");
  const [slippage, setSlippage] = useState<string>("0.5");
  const [estimatedOutput, setEstimatedOutput] = useState<string>("0");

  // Use the same loan detection logic as LoanPage
  const { loanInfo, refetch: refetchLoanInfo } = useUserLoanInfo();

  const {
    address,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    error,
    userBalance, // This is the main wallet USDC balance for margin
    createLoan,
    approveMargin,
    executeSwap,
    canCreateLoan,
    isLoadingLoanInfo, // Add this to check loading state
  } = useTradingHooks();

  // Get loan status from the same source as LoanPage
  const hasActiveLoan = Boolean(
    loanInfo?.isActive && loanInfo?.loanAmount > BigInt(0)
  );
  const restrictedWalletAddress = hasActiveLoan
    ? loanInfo?.restrictedWallet || null
    : null;

  // Get token objects
  const tokenIn = TOKENS[selectedTokenIn];
  const tokenOut = TOKENS[selectedTokenOut];

  // Calculate values using utility functions
  const marginRequired = calculateMarginRequired(tradeAmount);
  const hasInsufficientBalance = !hasSufficientBalance(
    userBalance,
    marginRequired
  );
  const leverageMultiplier = TRADING_CONFIG.MAX_LEVERAGE;
  const tradeValidation = validateTradeAmount(tradeAmount);

  // Get restricted wallet token balances (these are what user will trade with)
  const { data: restrictedTokenInBalance } = useRestrictedWalletBalance(
    tokenIn.address,
    restrictedWalletAddress
  );
  const { data: restrictedTokenOutBalance } = useRestrictedWalletBalance(
    tokenOut.address,
    restrictedWalletAddress
  );

  // Debug logging
  console.log("Trading Page Debug:", {
    hasActiveLoan,
    restrictedWalletAddress,
    address,
    isConnected,
    loanInfo,
  });

  // Calculate estimated output using utility function
  const calculateEstimatedOutput = React.useCallback(() => {
    if (!tradeAmount || !tokenIn.price || !tokenOut.price) return "0";

    return calculateMinAmountOut(
      tradeAmount,
      tokenIn,
      tokenOut,
      parseFloat(slippage)
    );
  }, [tradeAmount, tokenIn.price, tokenOut.price, slippage, tokenIn, tokenOut]);

  const handleCreateLoan = async () => {
    if (!tradeAmount) return;

    try {
      await createLoan(tradeAmount);
    } catch (err) {
      console.error("Error creating loan:", err);
    }
  };

  const handleApproveMargin = async () => {
    if (!marginRequired) return;

    try {
      await approveMargin(marginRequired);
    } catch (err) {
      console.error("Error approving margin:", err);
    }
  };

  // Debug logging and refresh loan info when needed
  React.useEffect(() => {
    console.log("TradingPage Debug:", {
      address,
      isConnected,
      hasActiveLoan,
      restrictedWalletAddress,
      isLoadingLoanInfo,
      loanInfo,
    });
  }, [
    address,
    isConnected,
    hasActiveLoan,
    restrictedWalletAddress,
    isLoadingLoanInfo,
    loanInfo,
  ]);

  // Refresh loan info when transaction is successful
  React.useEffect(() => {
    if (isSuccess) {
      refetchLoanInfo();
    }
  }, [isSuccess, refetchLoanInfo]);

  const handleExecuteSwap = async () => {
    if (!tradeAmount || !estimatedOutput || !restrictedWalletAddress) return;

    // Check if restricted wallet has sufficient balance for the trade
    const restrictedBalanceFormatted = restrictedTokenInBalance
      ? formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals)
      : "0";

    if (parseFloat(restrictedBalanceFormatted) < parseFloat(tradeAmount)) {
      console.error("Insufficient balance in restricted wallet");
      return;
    }

    try {
      // Note: executeSwap signature changed to only take 3 parameters
      await executeSwap(tokenIn, tokenOut, tradeAmount);
    } catch (err) {
      console.error("Error executing swap:", err);
    }
  };

  const swapTokens = () => {
    setSelectedTokenIn(selectedTokenOut);
    setSelectedTokenOut(selectedTokenIn);
  };

  // Update estimated output when inputs change
  React.useEffect(() => {
    setEstimatedOutput(calculateEstimatedOutput());
  }, [
    tradeAmount,
    selectedTokenIn,
    selectedTokenOut,
    slippage,
    tokenIn.price,
    tokenOut.price,
    calculateEstimatedOutput,
  ]);

  const tokens = Object.values(TOKENS);

  return (
    <div className="w-full bg-dark-bg p-4 rounded-lg border border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white mb-2">Uniswap Trading</h1>
          <p className="text-gray-400 text-sm">
            Trade tokens with{" "}
            <span className="text-teal-400 font-semibold">
              {leverageMultiplier}x leverage
            </span>{" "}
            using your restricted wallet
          </p>
        </div>

        {/* Status Cards */}
        <div className="mb-4">
          {!loanInfo ? (
            <div className="bg-black rounded-lg border border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="text-blue-400 font-medium">Loading loan information</p>
                  <p className="text-gray-400 text-sm">Checking for active loans and restricted wallets</p>
                </div>
              </div>
            </div>
          ) : restrictedWalletAddress && hasActiveLoan ? (
            <div className="bg-black rounded-lg border border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-400/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-teal-400 font-medium">Trading Wallet Active</p>
                  <p className="text-gray-300 font-mono text-sm">
                    {restrictedWalletAddress.slice(0, 6)}...{restrictedWalletAddress.slice(-4)}
                  </p>
                </div>
              </div>
            </div>
          ) : hasActiveLoan && !restrictedWalletAddress ? (
            <div className="bg-black rounded-lg border border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="text-orange-400 font-medium">Loading restricted wallet</p>
                  <p className="text-gray-400 text-sm">Your loan is active, fetching wallet address</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black rounded-lg border border-gray-700 p-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-yellow-400 font-medium mb-2">No active trading wallet</p>
                <p className="text-gray-400 text-sm mb-3">Create a loan to get your restricted wallet for trading</p>
                <button
                  onClick={() => refetchLoanInfo()}
                  className="px-3 py-1 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded text-yellow-300 hover:text-yellow-200 transition-all duration-200 text-sm font-medium"
                >
                  Refresh Status
                </button>
              </div>
            </div>
          )}
        </div>

        {/* {recommendedFeeTier && (
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center px-3 py-1 bg-gray-800/50 border border-gray-600/50 rounded-full">
              <span className="text-gray-400 text-sm">Recommended fee tier: </span>
              <span className="text-teal-400 text-sm font-medium ml-1">{recommendedFeeTier}</span>
              <span className="text-gray-500 text-sm ml-1">({tokenIn.symbol}/{tokenOut.symbol})</span>
            </div>
          </div>
        )} */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Trading Form */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg border border-gray-700 p-5">
              {/* Trade Type Toggle */}
              {/* <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-white">Trade Tokens</h2>
                <div className="bg-gray-800 rounded-lg border border-gray-600 p-1">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setTradeType("buy")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        tradeType === "buy"
                          ? "bg-teal-400 text-black"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setTradeType("sell")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        tradeType === "sell"
                          ? "bg-teal-400 text-black"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="space-y-4">
                {/* Token Swap Interface */}
                <div className="space-y-2">
                  {/* From Token */}
                  <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium text-gray-300">From</label>
                      <div className="text-right">
                        {restrictedTokenInBalance ? (
                          <span className="text-sm text-gray-400">
                            Balance: <span className="text-white font-medium">
                              {formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals)}
                            </span> {tokenIn.symbol}
                          </span>
                        ) : !restrictedWalletAddress ? (
                          <span className="text-sm text-red-400 font-medium">Create loan first</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <select
                        value={selectedTokenIn}
                        onChange={(e) => setSelectedTokenIn(e.target.value)}
                        className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white font-medium focus:border-teal-400 focus:outline-none min-w-[120px]"
                      >
                        {tokens.map((token) => (
                          <option key={token.symbol} value={token.symbol}>
                            {token.symbol}
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

                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-gray-400">
                        ≈ <span className="text-gray-300">${tradeAmount || "0.00"}</span> USD
                      </div>
                      {restrictedTokenInBalance && tradeAmount && (
                        <button className="text-sm text-teal-400 hover:text-teal-300 font-medium">
                          Use Max
                        </button>
                      )}
                    </div>

                    {/* Error Messages */}
                    {!tradeValidation.isValid && tradeAmount && (
                      <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
                        <p className="text-red-400 text-sm">{tradeValidation.error}</p>
                      </div>
                    )}

                    {restrictedWalletAddress && restrictedTokenInBalance && tradeAmount && (() => {
                      const restrictedBalance = formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals);
                      const hasInsufficientRestrictedBalance = parseFloat(restrictedBalance) < parseFloat(tradeAmount);
                      return hasInsufficientRestrictedBalance && (
                        <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
                          <p className="text-red-400 text-sm">
                            Insufficient {tokenIn.symbol} in restricted wallet
                          </p>
                          <p className="text-gray-400 text-sm">Available: {restrictedBalance}</p>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center py-1">
                    <button
                      onClick={swapTokens}
                      className="group p-2 bg-gray-700 hover:bg-teal-600 rounded-lg transition-all duration-300 border border-gray-600/50 hover:border-teal-500/50"
                    >
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>

                  {/* To Token */}
                  <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium text-gray-300">To</label>
                      <div className="text-right">
                        {restrictedTokenOutBalance ? (
                          <span className="text-sm text-gray-400">
                            Balance: <span className="text-white font-medium">
                              {formatTokenAmount(restrictedTokenOutBalance as bigint, tokenOut.decimals)}
                            </span> {tokenOut.symbol}
                          </span>
                        ) : !restrictedWalletAddress ? (
                          <span className="text-sm text-red-400 font-medium">Create loan first</span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <select
                        value={selectedTokenOut}
                        onChange={(e) => setSelectedTokenOut(e.target.value)}
                        className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white font-medium focus:border-teal-400 focus:outline-none min-w-[120px]"
                      >
                        {tokens.map((token) => (
                          <option key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </option>
                        ))}
                      </select>
                      <div className="flex-1 text-white text-xl font-semibold">
                        {estimatedOutput || "0.0"}
                      </div>
                    </div>

                    <div className="text-sm text-gray-400 mt-3">
                      ≈ <span className="text-gray-300">${calculateUSDValue(estimatedOutput, tokenOut)}</span> USD
                    </div>
                  </div>
                </div>

                {/* Slippage Control */}
                <div className="bg-gray-800/30 border border-gray-600/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Slippage Tolerance
                  </label>
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    {SLIPPAGE_OPTIONS.map((value) => (
                      <button
                        key={value}
                        onClick={() => setSlippage(value)}
                        className={`px-3 py-1 text-sm font-medium rounded transition-all duration-200 ${
                          slippage === value
                            ? "bg-teal-400 text-black"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white border border-gray-600/50"
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={slippage}
                        onChange={(e) => setSlippage(e.target.value)}
                        className="w-16 bg-gray-700/50 border border-gray-600/50 rounded px-2 py-1 text-white text-sm focus:border-teal-400 focus:outline-none"
                        step="0.1"
                        min="0"
                        max="50"
                      />
                      <span className="text-gray-400 text-sm">%</span>
                    </div>
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
      <div className="bg-black rounded-lg border border-gray-700 p-5 sticky top-6">
        <h3 className="text-xl font-semibold text-white mb-4">Trade Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Position Size</span>
            <span className="text-white">${tradeAmount || "0.00"}</span>
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
              <span className="text-teal-400">${calculateUSDValue(estimatedOutput, tokenOut)}</span>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {!tradeValidation.isValid && tradeAmount && (
          <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
            <p className="text-red-400 text-xs">{tradeValidation.error}</p>
          </div>
        )}

        {!isConnected && (
          <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-500/30 rounded">
            <p className="text-yellow-400 text-xs">Please connect your wallet to trade</p>
          </div>
        )}

        {hasInsufficientBalance && isConnected && (
          <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
            <p className="text-red-400 text-xs">Insufficient USDC balance for margin requirement</p>
          </div>
        )}

        {restrictedWalletAddress && restrictedTokenInBalance && tradeAmount && (() => {
          const restrictedBalance = formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals);
          const hasInsufficientRestrictedBalance = parseFloat(restrictedBalance) < parseFloat(tradeAmount);
          return hasInsufficientRestrictedBalance && (
            <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
              <p className="text-red-400 text-xs">
                Insufficient {tokenIn.symbol} in restricted wallet. Available: {restrictedBalance} {tokenIn.symbol}
              </p>
            </div>
          );
        })()}

        {hasActiveLoan && !restrictedWalletAddress && (
          <div className="mt-3 p-2 bg-blue-900/20 border border-blue-500/30 rounded">
            <p className="text-blue-400 text-xs">You have an active loan. Use it to trade or close it first.</p>
          </div>
        )}

        {Boolean(isSuccess) && (
          <div className="mt-3 p-2 bg-teal-900/20 border border-teal-500/30 rounded">
            <p className="text-teal-400 text-xs">Transaction successful!</p>
          </div>
        )}

        {Boolean(error) && (
          <div className="mt-3 p-2 bg-red-900/20 border border-red-500/30 rounded">
            <p className="text-red-400 text-xs">
              Error: {(error as Error)?.message || "Unknown error occurred"}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          {!hasActiveLoan && canCreateLoan && (
            <>
              <TransactionButton
                onClick={onApproveMargin}
                disabled={!tradeAmount}
                loading={isPending || isConfirming}
                variant="secondary"
                size="md"
                className="w-full"
              >
                {isPending ? "Approving..." : "Approve USDC"}
              </TransactionButton>

              <TransactionButton
                onClick={onCreateLoan}
                disabled={!tradeAmount}
                loading={isPending || isConfirming}
                variant="primary"
                size="md"
                className="w-full"
              >
                {isPending ? "Creating..." : isConfirming ? "Confirming..." : "Create Loan & Position"}
              </TransactionButton>
            </>
          )}

          {restrictedWalletAddress && (() => {
            const restrictedBalance = restrictedTokenInBalance
              ? formatTokenAmount(restrictedTokenInBalance as bigint, tokenIn.decimals)
              : "0";
            const hasInsufficientRestrictedBalance = parseFloat(restrictedBalance) < parseFloat(tradeAmount || "0");

            return (
              <TransactionButton
                onClick={onExecuteSwap}
                disabled={
                  !tradeAmount ||
                  !estimatedOutput ||
                  hasInsufficientRestrictedBalance ||
                  !restrictedWalletAddress
                }
                loading={isPending || isConfirming}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {isPending ? "Swapping..." : isConfirming ? "Confirming..." : "Execute Swap"}
              </TransactionButton>
            );
          })()}

          {!canCreateLoan && isConnected && tradeAmount && !hasActiveLoan && (
            <TransactionButton
              onClick={() => {}}
              disabled
              variant="secondary"
              size="md"
              className="w-full"
            >
              Insufficient Collateral or Invalid Amount
            </TransactionButton>
          )}
        </div>
      </div>
    </div>
  );
};
