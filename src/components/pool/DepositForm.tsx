"use client";

import { useEffect, useMemo } from "react";
import { useDeposit } from "@/hooks/useDeposit";
import { TransactionButton } from "@/components/common/TransactionButton";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorDisplay } from "@/components/common/ErrorDisplay";
import { formatUSDC } from "@/utils/formatters";

export const DepositForm = () => {
  const {
    amount,
    setAmount,
    error,
    setError,
    usdcBalance,
    expectedShares,
    userInfo,
    needsApproval,
    isValidAmount,
    isApproving,
    isDepositing,
    handleApprove,
    handleDeposit,
    resetStates,
    isApproveSuccess,
    isDepositSuccess,
  } = useDeposit();

  useEffect(() => {
    if (isDepositSuccess) resetStates();
  }, [isDepositSuccess, resetStates]);

  useEffect(() => {
    if (error) setError("");
  }, [amount, error, setError]);

  const hasBalance = usdcBalance && usdcBalance > BigInt(0);

  const validationMessage = useMemo(() => {
    if (!amount) return "";
    const num = parseFloat(amount);
    if (num <= 0) return "Amount must be greater than 0";
    if (usdcBalance && num > parseFloat(formatUSDC(usdcBalance)))
      return "Insufficient balance";
    return "";
  }, [amount, usdcBalance]);

  const showExpectedShares = expectedShares && parseFloat(amount) > 0;

  const isButtonDisabled = useMemo(() => {
    if (isApproving || isDepositing) return true;
    if (!isValidAmount) return true;
    if (needsApproval && !isApproveSuccess) return false;
    if (needsApproval && isApproveSuccess) return false;
    return false;
  }, [
    isApproving,
    isDepositing,
    isValidAmount,
    needsApproval,
    isApproveSuccess,
  ]);

  const handleMax = () => {
    if (!hasBalance) return;
    setAmount(formatUSDC(usdcBalance));
  };

  const statusText = isApproving
    ? "Approving USDC..."
    : isDepositing
    ? "Processing Deposit..."
    : needsApproval && !isApproveSuccess
    ? "Approve USDC First"
    : "Deposit USDC";

  return (
    <div className="bg-black rounded-lg p-6 border border-gray-700">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Deposit USDC</h3>
          <p className="text-sm text-gray-400">
            Earn 6% APY and provide liquidity for leveraged loans
          </p>
        </div>

        {/* User Info */}
        <div className="bg-dark-gray rounded-lg p-4 space-y-2">
          <InfoRow
            label="Available Balance"
            value={`${formatUSDC(usdcBalance || BigInt(0))} USDC`}
          />
          {userInfo && (
            <>
              <InfoRow
                label="Your Shares"
                value={`${formatUSDC(userInfo[0])} Shares`}
              />
              <InfoRow
                label="Asset Value"
                value={`${formatUSDC(userInfo[1])} USDC`}
              />
            </>
          )}
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Amount to Deposit
          </label>
          {showExpectedShares && (
            <p className="text-sm text-gray-400">
              You will receive: {formatUSDC(expectedShares)} Shares
            </p>
          )}
          <div className="relative">
            <input
              type="text"
              value={amount}
              placeholder="0.00"
              disabled={isApproving || isDepositing}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val) || val === "") setAmount(val);
              }}
              className="w-full bg-dark-gray border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleMax}
              disabled={!hasBalance || isApproving || isDepositing}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-teal-400 hover:text-teal-300 disabled:opacity-50"
            >
              MAX
            </button>
          </div>
          {validationMessage && (
            <p className="text-sm text-red-400">{validationMessage}</p>
          )}
        </div>

        {/* Error */}
        {error && <ErrorDisplay error={error} onRetry={() => setError("")} />}

        {/* Transaction Feedback */}
        {(isApproving || isDepositing) && (
          <div className="bg-dark-gray rounded-lg p-4 flex items-center space-x-3">
            <LoadingSpinner size="sm" />
            <div>
              <p className="text-sm text-white font-medium">{statusText}</p>
              <p className="text-xs text-gray-400">Please wait for confirmation</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isApproveSuccess && !isApproving && (
          <SuccessBox
            message="✅ Approval successful!"
            subtext="Click Deposit to continue."
          />
        )}
        {isDepositSuccess && !isDepositing && (
          <SuccessBox message="✅ Deposit successful! Your funds are earning yield." />
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={
            needsApproval && !isApproveSuccess ? handleApprove : handleDeposit
          }
          disabled={isButtonDisabled}
          loading={isApproving || isDepositing}
          size="lg"
          className="w-full"
        >
          {statusText}
        </TransactionButton>

        {/* Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Earn 6% APY on your USDC</p>
          <p>• Withdraw anytime with accrued yield</p>
          <p>• First time? You must approve USDC before deposit</p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

const SuccessBox = ({
  message,
  subtext,
}: {
  message: string;
  subtext?: string;
}) => (
  <div className="bg-teal-400/20 border border-teal-400/30 rounded-lg p-4 space-y-1">
    <p className="text-sm text-teal-400 font-medium">{message}</p>
    {subtext && <p className="text-xs text-teal-300">{subtext}</p>}
  </div>
);