"use client";

import React, { useState } from 'react';
import { useRestrictedWallet } from '@/hooks/useRestrictedWallet';
import { StatusCard, StatusItem } from '@/components/common/StatusCard';
import { ExplorerLink } from '@/components/common/ExplorerLink';
import { TransactionButton } from '@/components/common/TransactionButton';
import { TransactionNotification } from '@/components/common/TransactionNotification';
import { AmountInput } from '@/components/common/AmountInput';
import { formatUnits } from 'viem';

// Common token addresses (you might want to make this configurable)
const COMMON_TOKENS = [
  {
    address: '0x1b86c8516ED3DbaBF8434B8F1b33bfE4Bd85C0f9', // Replace with actual USDC address from config
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin'
  },
  // Add more tokens as needed from trading config
  // You can import these from trading/constants.ts
];

interface TokenBalanceCardProps {
  token: typeof COMMON_TOKENS[0];
  restrictedWalletAddress: string;
  onWithdraw: (tokenAddress: string, amount: string, decimals: number) => void;
  onWithdrawAll: (tokenAddress: string) => void;
  isWithdrawing: boolean;
}

const TokenBalanceCard: React.FC<TokenBalanceCardProps> = ({
  token,
  onWithdraw,
  onWithdrawAll,
  isWithdrawing
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { useRestrictedWalletBalance } = useRestrictedWallet();
  const { data: balance } = useRestrictedWalletBalance(token.address);

  const balanceFormatted = balance ? formatUnits(balance, token.decimals) : '0';
  const hasBalance = balance && balance > BigInt(0);

  const handleWithdraw = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      onWithdraw(token.address, withdrawAmount, token.decimals);
      setWithdrawAmount('');
    }
  };

  const handleWithdrawAll = () => {
    onWithdrawAll(token.address);
    setWithdrawAmount('');
  };

  if (!hasBalance) {
    return null; // Don't show tokens with zero balance
  }

  return (
    <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-medium text-white">{token.symbol}</h4>
          <p className="text-sm text-gray-400">{token.name}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-teal-400">
            {balanceFormatted} {token.symbol}
          </p>
          <p className="text-xs text-gray-500">Available to withdraw</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Partial Withdraw */}
        <div>
          <AmountInput
            value={withdrawAmount}
            onChange={setWithdrawAmount}
            label={`Withdraw ${token.symbol}`}
            maxValue={balance || BigInt(0)}
            maxLabel="Max"
            disabled={isWithdrawing}
          />
          <TransactionButton
            onClick={handleWithdraw}
            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > parseFloat(balanceFormatted)}
            loading={isWithdrawing}
            variant="secondary"
            size="sm"
            className="w-full mt-2"
          >
            Withdraw {withdrawAmount ? `${withdrawAmount} ` : ''}{token.symbol}
          </TransactionButton>
        </div>

        {/* Withdraw All */}
        <TransactionButton
          onClick={handleWithdrawAll}
          disabled={!hasBalance}
          loading={isWithdrawing}
          variant="primary"
          size="sm"
          className="w-full"
        >
          Withdraw All {token.symbol}
        </TransactionButton>
      </div>
    </div>
  );
};

export const RestrictedWalletPage: React.FC = () => {
  const {
    restrictedWalletAddress,
    hasRestrictedWallet,
    loanIsActive,
    withdrawToken,
    withdrawAllTokens,
    withdrawTx,
    isWithdrawing,
    resetTransactionState,
  } = useRestrictedWallet();

  if (!hasRestrictedWallet) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Restricted Wallet</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              You need to create a loan first to get a restricted wallet. Once you have a restricted wallet, you can manage your trading balances here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loanIsActive) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <StatusCard
          title="Restricted Wallet Status"
          status="active"
        >
          <StatusItem
            label="Wallet Address"
            value={
              <ExplorerLink address={restrictedWalletAddress!} showIcon={false}>
                {restrictedWalletAddress!.slice(0, 8)}...{restrictedWalletAddress!.slice(-6)}
              </ExplorerLink>
            }
          />
          <StatusItem
            label="Status"
            value="Active Loan - Withdrawal Locked"
            highlight={false}
          />
        </StatusCard>

        <div className="text-center py-8">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-900/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loan Still Active</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              You cannot withdraw from your restricted wallet while you have an active loan. Please repay your loan first to unlock withdrawal functionality.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Restricted Wallet Control</h1>
        <p className="text-gray-400">
          Manage and withdraw your funds from the restricted trading wallet.
        </p>
      </div>

      {/* Wallet Status */}
      <StatusCard
        title="Restricted Wallet Status"
        status="inactive"
      >
        <StatusItem
          label="Wallet Address"
          value={
            <ExplorerLink address={restrictedWalletAddress!} showIcon={false}>
              {restrictedWalletAddress!.slice(0, 8)}...{restrictedWalletAddress!.slice(-6)}
            </ExplorerLink>
          }
        />
        <StatusItem
          label="Status"
          value="Ready for Withdrawal"
          highlight={true}
        />
      </StatusCard>

      {/* Token Balances and Withdrawal */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Available Balances</h2>
        
        {COMMON_TOKENS.map((token) => (
          <TokenBalanceCard
            key={token.address}
            token={token}
            restrictedWalletAddress={restrictedWalletAddress!}
            onWithdraw={withdrawToken}
            onWithdrawAll={withdrawAllTokens}
            isWithdrawing={isWithdrawing}
          />
        ))}
      </div>

      {/* Transaction Notifications */}
      {withdrawTx.status !== 'idle' && (
        <TransactionNotification
          status={withdrawTx.status}
          hash={withdrawTx.hash}
          message={
            withdrawTx.status === 'success' 
              ? "Withdrawal completed successfully!" 
              : withdrawTx.status === 'pending'
              ? "Processing withdrawal..."
              : withdrawTx.error || "Withdrawal failed"
          }
          onClose={resetTransactionState}
        />
      )}

      {/* Help Section */}
      <div className="bg-teal-900/20 border border-teal-600/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-teal-400 mb-2">How Withdrawal Works</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• You can only withdraw when no active loan exists</li>
          <li>• Withdrawals transfer tokens from restricted wallet to your main wallet</li>
          <li>• You can withdraw partial amounts or all tokens at once</li>
          <li>• Each withdrawal requires a separate transaction and gas fee</li>
        </ul>
      </div>
    </div>
  );
};
