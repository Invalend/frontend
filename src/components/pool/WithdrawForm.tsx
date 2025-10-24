import { useWithdraw } from "@/hooks/useWithdraw";
import { parseUSDC } from "@/utils/formatters";
import { TransactionButton } from "@/components/common/TransactionButton";
import { StatusCard, StatusItem } from "@/components/common/StatusCard";
import { AmountInput } from "@/components/common/AmountInput";
import { TransactionNotification } from "@/components/common/TransactionNotification";
import { useState } from "react";

export const WithdrawForm = () => {
  const { 
    handleWithdraw, 
    withdrawTx, 
    currentStep, 
    isWithdrawing, 
    canWithdraw, 
    tokenBalance,
    resetTransactionState 
  } = useWithdraw();
  
  const [amount, setAmount] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const amountRaw = parseUSDC(amount || "0");
  const balanceRaw = parseUSDC(tokenBalance || "0");
  
  const isValidAmount = amountRaw > BigInt(0) && amountRaw <= balanceRaw;
  const isButtonDisabled = !isValidAmount || isWithdrawing || currentStep === 'success';

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    if (validationError) {
      setValidationError("");
    }
  };

  const handleWithdrawClick = async () => {
    if (!isValidAmount) return;
    
    try {
      await handleWithdraw("0x98Ca29e25df55BcE438a2F93013fB9790edaf342", amount); // MockUSDC address
    } catch (err) {
      console.error("Withdraw error:", err);
    }
  };

  return (
    <div className="bg-[#0A0A0A] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-normal text-white mb-2" style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>Withdraw Funds</h3>
          <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            Withdraw your profits and remaining funds after loan repayment.
          </p>
        </div>

        {/* Withdraw Status */}
        {canWithdraw ? (
          <StatusCard 
            title="Available for Withdrawal"
            className="border-green-500/20 bg-green-500/5"
          >
            <StatusItem 
              label="Available Balance" 
              value={`${tokenBalance} USDC`}
              highlight={true}
            />
            <StatusItem 
              label="Status" 
              value="Loan Repaid - Funds Available"
              highlight={true}
            />
          </StatusCard>
        ) : (
          <div className="bg-[#1E1E1E] rounded-lg p-6 text-center border border-[rgba(6,182,212,0.15)]">
            <div className="text-[#A3A3A3] mb-2">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-lg font-normal text-white mb-2" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px'
            }}>No Funds Available</h4>
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              You need to repay your loan first before withdrawing funds.
            </p>
          </div>
        )}

        {/* Amount Input */}
        {canWithdraw && (
          <div>
            <label className="block text-sm font-normal text-white mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              Withdraw Amount
            </label>
            <AmountInput
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              maxValue={parseUSDC(tokenBalance)}
              maxLabel="Balance"
              error={validationError}
            />
            <div className="flex justify-between text-xs text-[#A3A3A3] mt-1">
              <span>Available: {tokenBalance} USDC</span>
              <button
                onClick={() => setAmount(tokenBalance)}
                className="text-[#06B6D4] hover:text-[#0891B2] transition-colors"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                Max
              </button>
            </div>
          </div>
        )}

        {/* Transaction Notifications */}
        {withdrawTx.status === 'pending' && (
          <TransactionNotification
            hash={withdrawTx.hash}
            status="pending"
            message="Withdrawing funds..."
            autoHide={false}
          />
        )}

        {withdrawTx.status === 'success' && (
          <TransactionNotification
            hash={withdrawTx.hash}
            status="success"
            message="Funds withdrawn successfully!"
            onClose={() => {
              resetTransactionState();
              setAmount("");
            }}
          />
        )}

        {withdrawTx.status === 'error' && (
          <TransactionNotification
            status="error"
            message={withdrawTx.error || "Withdraw failed"}
            onClose={resetTransactionState}
          />
        )}

        {/* Action Button */}
        <TransactionButton
          onClick={handleWithdrawClick}
          disabled={isButtonDisabled}
          loading={isWithdrawing}
          size="lg"
          className="w-full"
          variant={canWithdraw && isValidAmount ? 'primary' : 'secondary'}
        >
          {currentStep === 'withdraw' && isWithdrawing 
            ? 'Withdrawing...' 
            : currentStep === 'success' 
            ? 'Withdraw Successful!' 
            : canWithdraw 
            ? 'Withdraw Funds' 
            : 'No Funds Available'}
        </TransactionButton>
      </div>
    </div>
  );
};