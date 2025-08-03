import { useCreateLoan, useUserLoanInfo, useRepayLoan } from "@/hooks/useLoan";
import { formatUSDC, formatRelativeTime } from "@/utils/formatters";
import { TransactionButton } from "@/components/common/TransactionButton";
import { StatusCard, StatusItem } from "@/components/common/StatusCard";
import { AmountInput } from "@/components/common/AmountInput";
import { TransactionNotification } from "@/components/common/TransactionNotification";
import { ExplorerLink } from "@/components/common/ExplorerLink";

export const BorrowForm = () => {
  const {
    amount,
    setAmount,
    validationError,
    requiredCollateral,
    poolFunding,
    needsApproval,
    isValidAmount,
    isApproving,
    isCreatingLoan,
    isApproveSuccess,
    approvalTx,
    loanTx,
    usdcBalance,
    handleApprove,
    handleCreateLoan,
    resetTransactionStates,
  } = useCreateLoan();

  const { loanInfo, refetch: refetchLoanInfo } = useUserLoanInfo();

  const statusText = isApproving
    ? "Approving..."
    : isCreatingLoan
    ? "Creating Loan..."
    : needsApproval && !isApproveSuccess
    ? "Approve USDC First"
    : "Create Loan";

  const isButtonDisabled = !isValidAmount || isApproving || isCreatingLoan;

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    if (validationError) {
      // Clear error when user starts typing
      resetTransactionStates();
    }
  };

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

        {/* Current Loan Status */}
        {loanInfo && (
          <StatusCard 
            title="Current Loan" 
            status={loanInfo.isActive ? 'active' : 'inactive'}
          >
            <StatusItem 
              label="Loan Amount" 
              value={`${formatUSDC(loanInfo.loanAmount)} USDC`}
              highlight={loanInfo.isActive}
            />
            <StatusItem 
              label="Collateral" 
              value={`${formatUSDC(loanInfo.marginAmount)} USDC`}
            />
            <StatusItem 
              label="Pool Funding" 
              value={`${formatUSDC(loanInfo.poolFunding)} USDC`}
            />
            <StatusItem 
              label="Started" 
              value={formatRelativeTime(loanInfo.startTime)}
            />
            {loanInfo.restrictedWallet && (
              <StatusItem 
                label="Restricted Wallet" 
                value={
                  <ExplorerLink address={loanInfo.restrictedWallet} showIcon={false}>
                    {loanInfo.restrictedWallet.slice(0, 8)}...
                  </ExplorerLink>
                }
              />
            )}
          </StatusCard>
        )}

        {/* Amount Input */}
        <AmountInput
          value={amount}
          onChange={handleAmountChange}
          label="Loan Amount"
          maxValue={usdcBalance}
          maxLabel="Balance"
          disabled={isApproving || isCreatingLoan}
          error={validationError}
        />

        {/* Loan Requirements */}
        {(requiredCollateral || poolFunding) && (
          <div className="bg-dark-gray rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Loan Requirements</h4>
            {requiredCollateral && (
              <StatusItem
                label="Required Collateral"
                value={`${formatUSDC(requiredCollateral)} USDC`}
                highlight
              />
            )}
            {poolFunding && (
              <StatusItem
                label="Pool Funding Needed"
                value={`${formatUSDC(poolFunding)} USDC`}
              />
            )}
          </div>
        )}

        {/* Transaction Notifications */}
        {approvalTx.status === 'pending' && (
          <TransactionNotification
            hash={approvalTx.hash}
            status="pending"
            message="Approving USDC spending..."
            autoHide={false}
          />
        )}

        {approvalTx.status === 'success' && (
          <TransactionNotification
            hash={approvalTx.hash}
            status="success"
            message="USDC approval successful!"
          />
        )}

        {approvalTx.status === 'error' && (
          <TransactionNotification
            status="error"
            message={approvalTx.error || "Approval failed"}
            onClose={resetTransactionStates}
          />
        )}

        {loanTx.status === 'pending' && (
          <TransactionNotification
            hash={loanTx.hash}
            status="pending"
            message="Creating loan..."
            autoHide={false}
          />
        )}

        {loanTx.status === 'success' && (
          <TransactionNotification
            hash={loanTx.hash}
            status="success"
            message="Loan created successfully!"
            onClose={() => {
              resetTransactionStates();
              refetchLoanInfo();
            }}
          />
        )}

        {loanTx.status === 'error' && (
          <TransactionNotification
            status="error"
            message={loanTx.error || "Loan creation failed"}
            onClose={resetTransactionStates}
          />
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={needsApproval && !isApproveSuccess ? handleApprove : handleCreateLoan}
          disabled={isButtonDisabled}
          loading={isApproving || isCreatingLoan}
          size="lg"
          className="w-full"
        >
          {statusText}
        </TransactionButton>
      </div>
    </div>
  );
};

// RepayForm
export const RepayForm = () => {
  const { loanInfo, refetch: refetchLoanInfo } = useUserLoanInfo();
  const { handleRepay, repayTx, isRepaying, resetTransactionState } = useRepayLoan();

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

        {/* Current Loan Status */}
        {loanInfo && (
          <StatusCard 
            title="Loan to Repay" 
            status={loanInfo.isActive ? 'active' : 'inactive'}
          >
            <StatusItem 
              label="Loan Amount" 
              value={`${formatUSDC(loanInfo.loanAmount)} USDC`}
              highlight={loanInfo.isActive}
            />
            <StatusItem 
              label="Collateral" 
              value={`${formatUSDC(loanInfo.marginAmount)} USDC`}
            />
            <StatusItem 
              label="Pool Funding" 
              value={`${formatUSDC(loanInfo.poolFunding)} USDC`}
            />
            <StatusItem 
              label="Started" 
              value={formatRelativeTime(loanInfo.startTime)}
            />
            {loanInfo.restrictedWallet && (
              <StatusItem 
                label="Restricted Wallet" 
                value={
                  <ExplorerLink address={loanInfo.restrictedWallet} showIcon={false}>
                    {loanInfo.restrictedWallet.slice(0, 8)}...
                  </ExplorerLink>
                }
              />
            )}
          </StatusCard>
        )}

        {/* No Active Loan */}
        {!activeLoan && (
          <div className="bg-dark-gray rounded-lg p-6 text-center border border-gray-600">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white mb-2">No Active Loan</h4>
            <p className="text-sm text-gray-400">
              You don&apos;t have any active loans to repay at the moment.
            </p>
          </div>
        )}

        {/* Transaction Notifications */}
        {repayTx.status === 'pending' && (
          <TransactionNotification
            hash={repayTx.hash}
            status="pending"
            message="Repaying loan..."
            autoHide={false}
          />
        )}

        {repayTx.status === 'success' && (
          <TransactionNotification
            hash={repayTx.hash}
            status="success"
            message="Loan repaid successfully!"
            onClose={() => {
              resetTransactionState();
              refetchLoanInfo();
            }}
          />
        )}

        {repayTx.status === 'error' && (
          <TransactionNotification
            status="error"
            message={repayTx.error || "Repay failed"}
            onClose={resetTransactionState}
          />
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={handleRepay}
          disabled={!activeLoan || isRepaying}
          loading={isRepaying}
          size="lg"
          className="w-full"
          variant={activeLoan ? 'primary' : 'secondary'}
        >
          {activeLoan ? 'Repay Loan' : 'No Loan to Repay'}
        </TransactionButton>
      </div>
    </div>
  );
};
