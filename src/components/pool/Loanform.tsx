import { useCreateLoan, useUserLoanInfo, useRepayLoan } from "@/hooks/useLoan";
import { formatUSDC } from "@/utils/formatters";
import { TransactionButton } from "@/components/common/TransactionButton";

export const BorrowForm = () => {
  const {
    amount,
    setAmount,
    error,
    requiredCollateral,
    poolFunding,
    needsApproval,
    isValidAmount,
    isApproving,
    isCreatingLoan,
    isApproveSuccess,
    isCreateLoanSuccess,
    handleApprove,
    handleCreateLoan,
  } = useCreateLoan();

  const { loanInfo } = useUserLoanInfo();

  const statusText = isApproving
    ? "Approving..."
    : isCreatingLoan
    ? "Creating Loan..."
    : needsApproval && !isApproveSuccess
    ? "Approve USDC First"
    : "Create Loan";

  const isButtonDisabled = !isValidAmount || isApproving || isCreatingLoan;

  return (
    <div className="bg-black rounded-lg p-6 border border-gray-700">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Borrow USDC</h3>
          <p className="text-sm text-gray-400">
            Borrow USDC with collateral. Monitor your loan and repay anytime.
          </p>
        </div>

        {/* User Loan Info */}
        {loanInfo && (
          <div className="bg-dark-gray rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Active Loan</span>
              <span className="text-white font-medium">{loanInfo.isActive ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Loan Amount</span>
              <span className="text-white font-medium">{formatUSDC(loanInfo.loanAmount)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Collateral</span>
              <span className="text-white font-medium">{formatUSDC(loanInfo.collateralAmount)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Pool Funding</span>
              <span className="text-white font-medium">{formatUSDC(loanInfo.poolFunding)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Start Time</span>
              <span className="text-white font-medium">{loanInfo.startTime ? new Date(Number(loanInfo.startTime) * 1000).toLocaleString() : '-'}</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Loan Amount (USDC)</label>
          <input
            type="text"
            value={amount}
            placeholder="0.00"
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val) || val === "") setAmount(val);
            }}
            className="w-full bg-dark-gray border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400"
          />
        </div>

        {requiredCollateral && (
          <div className="text-sm text-gray-400">
            Required Collateral: {formatUSDC(requiredCollateral)} USDC
          </div>
        )}

        {poolFunding && (
          <div className="text-sm text-gray-400">
            Pool Funding Needed: {formatUSDC(poolFunding)} USDC
          </div>
        )}

        {error && <div className="text-sm text-red-400">{error}</div>}

        <TransactionButton
          onClick={needsApproval && !isApproveSuccess ? handleApprove : handleCreateLoan}
          disabled={isButtonDisabled}
          loading={isApproving || isCreatingLoan}
          size="lg"
          className="w-full"
        >
          {statusText}
        </TransactionButton>

        {isCreateLoanSuccess && (
          <div className="text-teal-400 text-sm">✅ Loan created successfully!</div>
        )}
      </div>
    </div>
  );
};

// RepayForm
export const RepayForm = () => {
  const { loanInfo } = useUserLoanInfo();
  const { handleRepay, isRepaying, isRepaySuccess, error } = useRepayLoan();

  const activeLoan = loanInfo && loanInfo.loanAmount && loanInfo.isActive;

  return (
    <div className="bg-black rounded-lg p-6 border border-gray-700">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Repay Loan</h3>
          <p className="text-sm text-gray-400">
            Repay your active loan to unlock your collateral.
          </p>
        </div>

        {/* User Loan Info */}
        {loanInfo && (
          <div className="bg-dark-gray rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Active Loan</span>
              <span className="text-white font-medium">{loanInfo.isActive ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Loan Amount</span>
              <span className="text-white font-medium">{formatUSDC(loanInfo.loanAmount)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Collateral</span>
              <span className="text-white font-medium">{formatUSDC(loanInfo.collateralAmount)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Pool Funding</span>
              <span className="text-white font-medium">{formatUSDC(loanInfo.poolFunding)} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Start Time</span>
              <span className="text-white font-medium">{loanInfo.startTime ? new Date(Number(loanInfo.startTime) * 1000).toLocaleString() : '-'}</span>
            </div>
          </div>
        )}

        {/* Loan Info/Empty State */}
        {!activeLoan && (
          <div className="bg-dark-gray rounded-lg p-4 text-center">
            <span className="text-sm text-gray-400">No active loan found.</span>
          </div>
        )}

        {/* Error */}
        {error && <div className="text-sm text-red-400">{error}</div>}

        {/* Transaction Feedback */}
        {isRepaying && (
          <div className="bg-dark-gray rounded-lg p-4 flex items-center space-x-3">
            <span className="text-sm text-white font-medium">Repaying...</span>
          </div>
        )}

        {/* Success Message */}
        {isRepaySuccess && (
          <div className="bg-teal-400/20 border border-teal-400/30 rounded-lg p-4">
            <span className="text-sm text-teal-400 font-medium">✅ Repay successful!</span>
          </div>
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={handleRepay}
          disabled={!activeLoan || isRepaying}
          loading={isRepaying}
          size="lg"
          className="w-full"
        >
          Repay Loan
        </TransactionButton>
      </div>
    </div>
  );
};
