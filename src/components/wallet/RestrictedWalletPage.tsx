"use client";

import React, { useState } from 'react';
import { useRestrictedWallet } from '@/hooks/useRestrictedWallet';
import { StatusCard, StatusItem } from '@/components/common/StatusCard';
import { ExplorerLink } from '@/components/common/ExplorerLink';
import { TransactionButton } from '@/components/common/TransactionButton';
import { TransactionNotification } from '@/components/common/TransactionNotification';
import { AmountInput } from '@/components/common/AmountInput';
import { formatUnits } from 'viem';
import { CONTRACT_CONFIGS } from '@/config/contracts';

// Token configuration with actual contract addresses
const COMMON_TOKENS = [
  {
    address: CONTRACT_CONFIGS.MOCK_USDC.address,
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
    icon: '💵'
  },
  {
    address: CONTRACT_CONFIGS.MOCK_ETH.address,
    symbol: 'ETH',
    decimals: 18,
    name: 'Ethereum',
    icon: '🔷'
  },
  {
    address: CONTRACT_CONFIGS.MOCK_BTC.address,
    symbol: 'BTC',
    decimals: 8,
    name: 'Bitcoin',
    icon: '₿'
  }
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

  // Show all tokens, but with different styling for zero balance
  const isZeroBalance = !hasBalance;

  return (
    <div className={`bg-[#1E1E1E] rounded-lg p-4 border transition-colors ${
      isZeroBalance 
        ? 'border-[rgba(163,163,163,0.1)] opacity-60' 
        : 'border-[rgba(6,182,212,0.15)] hover:border-[rgba(6,182,212,0.3)]'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{token.icon}</div>
          <div>
            <h4 className="text-lg font-normal text-white" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px'
            }}>{token.symbol}</h4>
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>{token.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xl font-normal ${isZeroBalance ? 'text-[#A3A3A3]' : 'text-[#06B6D4]'}`} style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-0.5px'
          }}>
            {balanceFormatted} {token.symbol}
          </p>
          <p className="text-xs text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            {isZeroBalance ? 'No balance' : 'Available to withdraw'}
          </p>
        </div>
      </div>

      {!isZeroBalance && (
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
      )}

      {isZeroBalance && (
        <div className="text-center py-2">
          <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            No balance available for withdrawal
          </p>
        </div>
      )}
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
    useRestrictedWalletBalance,
    loanStats,
  } = useRestrictedWallet();

  // Calculate total balances for summary - move hooks to component level
  const usdcBalance = useRestrictedWalletBalance(COMMON_TOKENS[0].address);
  const ethBalance = useRestrictedWalletBalance(COMMON_TOKENS[1].address);
  const btcBalance = useRestrictedWalletBalance(COMMON_TOKENS[2].address);
  
  const tokenBalances = [
    {
      ...COMMON_TOKENS[0],
      balance: usdcBalance.data || BigInt(0),
      formatted: usdcBalance.data ? formatUnits(usdcBalance.data, COMMON_TOKENS[0].decimals) : '0'
    },
    {
      ...COMMON_TOKENS[1],
      balance: ethBalance.data || BigInt(0),
      formatted: ethBalance.data ? formatUnits(ethBalance.data, COMMON_TOKENS[1].decimals) : '0'
    },
    {
      ...COMMON_TOKENS[2],
      balance: btcBalance.data || BigInt(0),
      formatted: btcBalance.data ? formatUnits(btcBalance.data, COMMON_TOKENS[2].decimals) : '0'
    }
  ];

  const totalTokensWithBalance = tokenBalances.filter(t => t.balance > BigInt(0)).length;

  if (!hasRestrictedWallet) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1E1E1E] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-normal text-white mb-2" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px'
            }}>No Restricted Wallet</h2>
            <p className="text-[#A3A3A3] max-w-md mx-auto font-normal" style={{ fontFamily: 'Space Grotesk' }}>
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
        <h1 className="text-3xl font-normal text-white mb-2" style={{ 
          fontFamily: 'Space Grotesk',
          letterSpacing: '-1px',
          lineHeight: '1.1'
        }}>Restricted Wallet Control</h1>
        <p className="text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
          Manage and withdraw your funds from the restricted trading wallet.
        </p>
        {loanStats && loanStats.totalLoansRepaid > 0 && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-green-400 text-sm font-medium">
                🎉 Congratulations! Your loan has been repaid. You can now withdraw your trading profits.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Wallet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          title="Wallet Status"
          status="inactive"
        >
          <StatusItem
            label="Address"
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
          <StatusItem
            label="Loan Status"
            value="Loan Repaid - Withdrawal Unlocked"
            highlight={true}
          />
        </StatusCard>

        <StatusCard
          title="Token Summary"
          status="inactive"
        >
          <StatusItem
            label="Tokens with Balance"
            value={`${totalTokensWithBalance} of ${COMMON_TOKENS.length}`}
          />
          <StatusItem
            label="Total Supported"
            value={`${COMMON_TOKENS.length} tokens`}
          />
        </StatusCard>

        <StatusCard
          title="Quick Actions"
          status="inactive"
        >
          <div className="space-y-2">
            <TransactionButton
              onClick={() => {
                // Withdraw all tokens that have balance
                tokenBalances
                  .filter(t => t.balance > BigInt(0))
                  .forEach(token => {
                    withdrawAllTokens(token.address);
                  });
              }}
              disabled={totalTokensWithBalance === 0 || isWithdrawing}
              loading={isWithdrawing}
              variant="primary"
              size="sm"
              className="w-full"
            >
              Withdraw All Tokens
            </TransactionButton>
          </div>
        </StatusCard>
      </div>

      {/* Token Balances and Withdrawal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-normal text-white" style={{ 
            fontFamily: 'Space Grotesk',
            letterSpacing: '-0.5px'
          }}>Token Balances</h2>
          <div className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            All supported tokens
          </div>
        </div>
        
        <div className="grid gap-4">
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

      {/* Loan Information */}
      {loanStats && (
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-400 mb-2">Loan Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-300">Total Loans Created</p>
              <p className="text-white font-medium">{String(loanStats.totalLoansCreated || 0)}</p>
            </div>
            <div>
              <p className="text-gray-300">Total Loans Repaid</p>
              <p className="text-white font-medium">{String(loanStats.totalLoansRepaid || 0)}</p>
            </div>
            <div>
              <p className="text-gray-300">Active Loans</p>
              <p className="text-white font-medium">{String(loanStats.activeLoans || 0)}</p>
            </div>
          </div>
          {loanStats.totalLoansRepaid > 0 && (
            <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-green-400 text-sm font-medium">
                  Your loan has been successfully repaid! You can now withdraw your trading profits.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Help Section */}
      <div className="bg-teal-900/20 border border-teal-600/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-teal-400 mb-2">How Withdrawal Works</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• You can only withdraw when no active loan exists</li>
          <li>• Withdrawals transfer tokens from restricted wallet to your main wallet</li>
          <li>• You can withdraw partial amounts or all tokens at once</li>
          <li>• Each withdrawal requires a separate transaction and gas fee</li>
          <li>• Loan must be fully repaid before withdrawal is unlocked</li>
        </ul>
        
        {loanStats && loanStats.totalLoansRepaid > 0 && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
            <h4 className="text-green-400 font-medium mb-2">✅ Loan Repayment Status</h4>
            <p className="text-sm text-green-300">
              Your loan has been successfully repaid! This means you can now withdraw any trading profits 
              that accumulated in your restricted wallet during the loan period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
