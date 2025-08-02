"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { PoolPage } from "@/components/pool/PoolPage";
import { FaucetPage } from "@/components/faucet/FaucetPage";
import { BorrowForm, RepayForm } from "@/components/pool/Loanform";
import { PoolStats } from "@/components/pool/PoolStats";

type TabType = "pool" | "loans" | "dashboard" | "faucet";

export const Layout = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <div className="bg-dark-gray rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-2">Pool Overview</h2>
              <PoolStats />
            </div>
            <div className="bg-dark-gray rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-2">Your Position</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-gray-300">Total Deposit: <span className="font-bold">-</span></div>
                <div className="text-gray-300">Total Loans: <span className="font-bold">-</span></div>
                <div className="text-gray-300">APY: <span className="font-bold">-</span></div>
                <div className="text-gray-300">Health Status: <span className="font-bold">-</span></div>
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
              <div className="bg-black rounded-lg border border-gray-700 p-0 max-w-md mx-auto">
                <LoanTabSwitch />
              </div>
            </div>
          </div>
        );
      case "faucet":
        return <FaucetPage />;
      default:
        return <PoolPage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  );
};

const LoanTabSwitch = () => {
  const [activeTab, setActiveTab] = useState<'borrow' | 'repay'>('borrow');
  return (
    <>
      <div className="flex">
        <button
          className={`flex-1 py-2 text-center font-medium text-sm rounded-l-lg transition-colors ${
            activeTab === 'borrow'
              ? 'text-teal-400 bg-gray-800'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          style={{ border: "none" }}
          onClick={() => setActiveTab('borrow')}
        >
          Borrow
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium text-sm rounded-r-lg transition-colors ${
            activeTab === 'repay'
              ? 'text-teal-400 bg-gray-800'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          style={{ border: "none" }}
          onClick={() => setActiveTab('repay')}
        >
          Repay
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'borrow' ? <BorrowForm /> : <RepayForm />}
      </div>
    </>
  );
};
