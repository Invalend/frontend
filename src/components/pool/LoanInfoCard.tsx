"use client";

import { StatusCard } from "@/components/common/StatusCard";

export const LoanInfoCard = () => {
  return (
    <StatusCard title="How It Works">
      <div className="space-y-4 text-sm">
        <div className="space-y-2">
          <h4 className="text-white font-medium">1. Deposit Collateral</h4>
          <p className="text-gray-400">
            Deposit USDC as collateral to secure your loan. The required collateral is calculated based on the loan amount.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-white font-medium">2. Receive Loan</h4>
          <p className="text-gray-400">
            Get your loan amount plus additional funding from the lending pool for trading purposes.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-white font-medium">3. Trade with Restricted Wallet</h4>
          <p className="text-gray-400">
            Use the restricted trading wallet to trade on supported DEXs. Your trades are limited to whitelisted tokens.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-white font-medium">4. Repay to Unlock</h4>
          <p className="text-gray-400">
            Repay your loan anytime to unlock your collateral and close the trading position.
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h5 className="text-yellow-400 font-medium text-sm">Important</h5>
              <p className="text-yellow-400/80 text-xs mt-1">
                Always ensure you can repay your loan. Monitor your positions carefully and manage risk appropriately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StatusCard>
  );
};
