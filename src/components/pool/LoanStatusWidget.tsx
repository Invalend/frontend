"use client";

import { useUserLoanInfo } from "@/hooks/useLoan";
import { formatUSDC, formatDate, formatRelativeTime } from "@/utils/formatters";
import { StatusCard, StatusItem } from "@/components/common/StatusCard";
import { ExplorerLink } from "@/components/common/ExplorerLink";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const LoanStatusWidget = () => {
  const { loanInfo, refetch } = useUserLoanInfo();

  if (!loanInfo) {
    return (
      <StatusCard title="Loan Status">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      </StatusCard>
    );
  }

  const hasActiveLoan = loanInfo.isActive && loanInfo.loanAmount > BigInt(0);

  return (
    <StatusCard 
      title="Your Loan Status" 
      status={hasActiveLoan ? 'active' : 'inactive'}
    >
      {hasActiveLoan ? (
        <>
          <StatusItem 
            label="Loan Amount" 
            value={`${formatUSDC(loanInfo.loanAmount)} USDC`}
            highlight
          />
          <StatusItem 
            label="Collateral Deposited" 
            value={`${formatUSDC(loanInfo.marginAmount)} USDC`}
          />
          <StatusItem 
            label="Pool Funding" 
            value={`${formatUSDC(loanInfo.poolFunding)} USDC`}
          />
          <StatusItem 
            label="Loan Started" 
            value={formatRelativeTime(loanInfo.startTime)}
          />
          <StatusItem 
            label="Start Date" 
            value={formatDate(loanInfo.startTime)}
          />
          {loanInfo.restrictedWallet && (
            <StatusItem 
              label="Trading Wallet" 
              value={
                <ExplorerLink address={loanInfo.restrictedWallet} showIcon={false}>
                  {loanInfo.restrictedWallet.slice(0, 6)}...{loanInfo.restrictedWallet.slice(-4)}
                </ExplorerLink>
              }
            />
          )}
        </>
      ) : (
        <div className="text-center py-4">
          <div className="text-gray-400 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-gray-400">No active loan</p>
          <p className="text-xs text-gray-500 mt-1">Create a loan to start trading</p>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-gray-600">
        <button
          onClick={() => refetch()}
          className="w-full text-sm text-teal-400 hover:text-teal-300 transition-colors flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Status
        </button>
      </div>
    </StatusCard>
  );
};
