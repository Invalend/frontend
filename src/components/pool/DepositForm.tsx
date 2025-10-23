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
    <div className="bg-[#0A0A0A] rounded-lg p-8 border border-[rgba(6,182,212,0.15)]">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-normal text-white mb-3" style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>Deposit USDC</h3>
          <p className="text-lg text-[#A3A3A3]" style={{ 
            fontFamily: 'Space Grotesk',
            lineHeight: '1.6'
          }}>
            Earn 6% APY and provide liquidity for leveraged loans
          </p>
        </div>

        {/* User Info */}
        <div className="bg-[#1E1E1E] rounded-lg p-6 space-y-4">
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
        <div className="space-y-4">
          <label className="block text-sm font-normal text-[#A3A3A3]" style={{ fontFamily: 'Space Grotesk' }}>
            Amount to Deposit
          </label>
          {showExpectedShares && (
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
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
              className="w-full bg-[#1E1E1E] border border-[rgba(6,182,212,0.15)] rounded-lg px-4 py-3 text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#06B6D4] disabled:opacity-50 transition-colors"
              style={{ fontFamily: 'Space Grotesk' }}
            />
            <button
              type="button"
              onClick={handleMax}
              disabled={!hasBalance || isApproving || isDepositing}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#06B6D4] hover:text-[#06B6D4]/80 disabled:opacity-50 font-normal"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              MAX
            </button>
          </div>
          {validationMessage && (
            <p className="text-sm text-red-400 font-normal" style={{ fontFamily: 'Space Grotesk' }}>{validationMessage}</p>
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
        <div className="text-xs text-[#A3A3A3] space-y-2 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
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
    <span className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>{label}</span>
    <span className="text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>{value}</span>
  </div>
);

const SuccessBox = ({
  message,
  subtext,
}: {
  message: string;
  subtext?: string;
}) => (
  <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-lg p-4 space-y-1">
    <p className="text-sm text-[#06B6D4] font-normal" style={{ fontFamily: 'Space Grotesk' }}>{message}</p>
    {subtext && <p className="text-xs text-[#06B6D4]/70 font-normal" style={{ fontFamily: 'Space Grotesk' }}>{subtext}</p>}
  </div>
);