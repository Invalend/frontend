"use client";

import { useState } from "react";
import AppNavbar from "./AppNavbar";
import { PoolPage } from "@/components/pool/PoolPage";
import { FaucetPage } from "@/components/faucet/FaucetPage";
import { TradingPage } from "@/components/trading";
import { BorrowForm, RepayForm } from "@/components/pool/Loanform";
import { WithdrawForm } from "@/components/pool/WithdrawForm";
import { PoolStats } from "@/components/pool/PoolStats";
import { RestrictedWalletPage } from "@/components/wallet/RestrictedWalletPage";
import { usePool } from "@/hooks/usePool";
import { useWithdraw } from "@/hooks/useWithdraw";
import { TransactionButton } from "@/components/common/TransactionButton";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { type TabType } from "@/config/navigation";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  
  // Get real data for dashboard
  const { poolStats, userInfo, isLoading: isLoadingPool } = usePool();
  const {
    isWithdrawing,
    handleWithdraw,
    canWithdraw,
    tokenBalance,
  } = useWithdraw();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="w-full space-y-8">
            {/* Welcome Section */}
            <div className="bg-[#141414] rounded-lg border border-[rgba(6,182,212,0.15)] p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-normal mb-2" style={{ 
                    fontFamily: 'Space Grotesk',
                    letterSpacing: '-1px',
                    lineHeight: '1.1',
                    color: '#06B6D4'
                  }}>
                    Welcome to Invalend
                  </h1>
                  <p className="text-[#A3A3A3] text-lg" style={{ 
                    fontFamily: 'Space Grotesk',
                    lineHeight: '1.6'
                  }}>
                    Your decentralized lending & trading platform
                  </p>
                </div>
                <div className="bg-[#06B6D4]/10 text-[#06B6D4] px-4 py-2 rounded-lg text-sm font-normal border border-[#06B6D4]/20">
                  Beta
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                  <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Total Value Locked</div>
                  <div className="text-2xl font-normal mb-1" style={{ 
                    fontFamily: 'Space Grotesk',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF'
                  }}>$2.4M</div>
                  <div className="text-[#06B6D4] text-xs font-normal">+12.5% this month</div>
                </div>
                <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                  <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Active Loans</div>
                  <div className="text-2xl font-normal mb-1" style={{ 
                    fontFamily: 'Space Grotesk',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF'
                  }}>156</div>
                  <div className="text-[#06B6D4] text-xs font-normal">8 new today</div>
                </div>
                <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.3)]">
                  <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Current APY</div>
                  <div className="text-2xl font-normal mb-1" style={{ 
                    fontFamily: 'Space Grotesk',
                    letterSpacing: '-0.5px',
                    color: '#06B6D4'
                  }}>6.2%</div>
                  <div className="text-[#06B6D4]/70 text-xs font-normal">Fixed rate</div>
                </div>
              </div>
            </div>

            {/* Pool Overview */}
            <div className="bg-[#141414] rounded-lg border border-[rgba(6,182,212,0.15)] p-8">
              <h2 className="text-2xl font-normal mb-6 flex items-center gap-3" style={{ 
                fontFamily: 'Space Grotesk',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
                color: '#06B6D4'
              }}>
                <div className="w-8 h-8 bg-[#06B6D4]/10 rounded-lg flex items-center justify-center border border-[#06B6D4]/20">
                  <svg className="w-4 h-4 text-[#06B6D4]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                </div>
                Lending Pool Overview
              </h2>
              <PoolStats />
            </div>
            
            {/* Your Portfolio */}
            <div className="bg-[#141414] rounded-lg border border-[rgba(6,182,212,0.15)] p-8">
              <h2 className="text-2xl font-normal mb-6 flex items-center gap-3" style={{ 
                fontFamily: 'Space Grotesk',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
                color: '#06B6D4'
              }}>
                <div className="w-8 h-8 bg-[#06B6D4]/10 rounded-lg flex items-center justify-center border border-[#06B6D4]/20">
                  <svg className="w-4 h-4 text-[#06B6D4]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                  </svg>
                </div>
                Your Portfolio
              </h2>
              
              {/* Portfolio Tabs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lending Position */}
                <div className="space-y-6">
                  <h3 className="text-xl font-normal" style={{ 
                    fontFamily: 'Space Grotesk',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF'
                  }}>Lending Position</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                      <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>USDC Deposited</div>
                      <div className="text-xl font-normal mb-1" style={{ 
                        fontFamily: 'Space Grotesk',
                        letterSpacing: '-0.5px',
                        color: '#FFFFFF'
                      }}>
                        {isLoadingPool ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          `$${userInfo?.shares || "0"}`
                        )}
                      </div>
                      <div className="text-[#A3A3A3] text-xs font-normal">Available for lending</div>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                      <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Asset Value</div>
                      <div className="text-xl font-normal mb-1" style={{ 
                        fontFamily: 'Space Grotesk',
                        letterSpacing: '-0.5px',
                        color: '#06B6D4'
                      }}>
                        {isLoadingPool ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          `$${userInfo?.assetValue || "0"}`
                        )}
                      </div>
                      <div className="text-[#A3A3A3] text-xs font-normal">Current value with earnings</div>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.3)]">
                      <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Current APY</div>
                      <div className="text-xl font-normal mb-1" style={{ 
                        fontFamily: 'Space Grotesk',
                        letterSpacing: '-0.5px',
                        color: '#06B6D4'
                      }}>
                        {isLoadingPool ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          `${poolStats?.apy || "0"}%`
                        )}
                      </div>
                      <div className="text-[#06B6D4]/70 text-xs font-normal">Annual yield</div>
                    </div>
                    
                    {/* Withdraw Section */}
                    {userInfo && parseFloat(userInfo.shares) > 0 && canWithdraw && (
                      <div className="bg-[#0A0A0A] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                        <h4 className="text-lg font-normal mb-4" style={{ 
                          fontFamily: 'Space Grotesk',
                          letterSpacing: '-0.5px',
                          color: '#FFFFFF'
                        }}>Withdraw Funds</h4>
                        <div className="space-y-4">
                          <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[rgba(6,182,212,0.15)]">
                            <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                              Available for Withdrawal
                            </div>
                            <div className="text-lg font-normal" style={{ 
                              fontFamily: 'Space Grotesk',
                              letterSpacing: '-0.5px',
                              color: '#06B6D4'
                            }}>
                              {tokenBalance} USDC
                            </div>
                            <div className="text-xs text-[#A3A3A3] font-normal mt-1" style={{ fontFamily: 'Space Grotesk' }}>
                              After loan repayment
                            </div>
                          </div>
                          <TransactionButton
                            onClick={() => handleWithdraw("0x51BE083DB53C0BbD8c8Af1dca4b7A8F7C4b80b2C", tokenBalance)}
                            disabled={!canWithdraw || isWithdrawing || parseFloat(tokenBalance) <= 0}
                            loading={isWithdrawing}
                            variant="secondary"
                            size="sm"
                            className="w-full"
                          >
                            {isWithdrawing ? "Withdrawing..." : "Withdraw All"}
                          </TransactionButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trading Position */}
                <div className="space-y-6">
                  <h3 className="text-xl font-normal" style={{ 
                    fontFamily: 'Space Grotesk',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF'
                  }}>Trading Position</h3>
                  <div className="space-y-4">
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                      <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Active Loan</div>
                      <div className="text-xl font-normal mb-1" style={{ 
                        fontFamily: 'Space Grotesk',
                        letterSpacing: '-0.5px',
                        color: '#FFFFFF'
                      }}>$12,500</div>
                      <div className="text-[#A3A3A3] text-xs font-normal">Borrowed for trading</div>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.15)]">
                      <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>Collateral</div>
                      <div className="text-xl font-normal mb-1" style={{ 
                        fontFamily: 'Space Grotesk',
                        letterSpacing: '-0.5px',
                        color: '#FFFFFF'
                      }}>$2,500</div>
                      <div className="text-[#A3A3A3] text-xs font-normal">Margin requirement</div>
                    </div>
                    <div className="bg-[#1E1E1E] rounded-lg p-6 border border-[rgba(6,182,212,0.3)]">
                      <div className="text-[#A3A3A3] text-sm mb-2" style={{ fontFamily: 'Space Grotesk' }}>P&L</div>
                      <div className="text-xl font-normal mb-1" style={{ 
                        fontFamily: 'Space Grotesk',
                        letterSpacing: '-0.5px',
                        color: '#06B6D4'
                      }}>+$387</div>
                      <div className="text-[#06B6D4]/70 text-xs font-normal">Unrealized gains</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "pool":
        return <PoolPage />;
      case "loans":
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="bg-[#141414] rounded-lg border border-[rgba(6,182,212,0.15)] p-0 max-w-md mx-auto">
                <LoanTabSwitch />
              </div>
            </div>
          </div>
        );
      case "faucet":
        return <FaucetPage />;
      case "trading":
        return <TradingPage />;
      case "wallet":
        return <RestrictedWalletPage />;
      case "docs":
        // Redirect to docs page or render docs component
        if (typeof window !== 'undefined') {
          window.open('/docs', '_blank');
        }
        return null;
      default:
        return <PoolPage />;
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <AppNavbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main id="main-content" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 pt-20">
        {renderActiveTab()}
      </main>
    </div>
  );
};

// Loan Tab Switch Component
const LoanTabSwitch = () => {
  const [activeTab, setActiveTab] = useState<'borrow' | 'repay' | 'withdraw'>('borrow');
  
  return (
    <>
      <div className="flex border-b border-[rgba(6,182,212,0.15)]">
        <button
          className={`flex-1 py-4 text-center font-normal text-sm transition-colors rounded-tl-lg ${
            activeTab === 'borrow'
              ? 'text-[#06B6D4] border-b border-[#06B6D4] bg-[#1E1E1E]'
              : 'text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]'
          }`}
          onClick={() => setActiveTab('borrow')}
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Borrow
        </button>
        <button
          className={`flex-1 py-4 text-center font-normal text-sm transition-colors ${
            activeTab === 'repay'
              ? 'text-[#06B6D4] border-b border-[#06B6D4] bg-[#1E1E1E]'
              : 'text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]'
          }`}
          onClick={() => setActiveTab('repay')}
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Repay
        </button>
        <button
          className={`flex-1 py-4 text-center font-normal text-sm transition-colors rounded-tr-lg ${
            activeTab === 'withdraw'
              ? 'text-[#06B6D4] border-b border-[#06B6D4] bg-[#1E1E1E]'
              : 'text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]'
          }`}
          onClick={() => setActiveTab('withdraw')}
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Withdraw
        </button>
      </div>
      <div className="p-8">
        {activeTab === 'borrow' ? <BorrowForm /> : 
         activeTab === 'repay' ? <RepayForm /> : 
         <WithdrawForm />}
      </div>
    </>
  );
};
