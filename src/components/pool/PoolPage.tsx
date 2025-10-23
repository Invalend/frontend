"use client";

import { DepositForm } from "./DepositForm";
import { WithdrawForm } from "./WithdrawForm";
import { useState } from "react";

export const PoolPage = () => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  return (
    <div className="w-full space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Pool Actions */}
        <div className="space-y-6">
          <div className="bg-[#141414] rounded-lg border border-[rgba(6,182,212,0.15)] p-0 max-w-md mx-auto">
          <div className="flex border-b border-[rgba(6,182,212,0.15)]">
            <button
              className={`flex-1 py-4 text-center font-normal text-sm transition-colors rounded-tl-lg ${
                activeTab === "deposit"
                  ? "text-[#06B6D4] border-b border-[#06B6D4] bg-[#1E1E1E]"
                  : "text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]"
              }`}
              onClick={() => setActiveTab("deposit")}
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Deposit
            </button>
            <button
              className={`flex-1 py-4 text-center font-normal text-sm transition-colors rounded-tr-lg ${
                activeTab === "withdraw"
                  ? "text-[#06B6D4] border-b border-[#06B6D4] bg-[#1E1E1E]"
                  : "text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]"
              }`}
              onClick={() => setActiveTab("withdraw")}
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Withdraw
            </button>
          </div>
          <div className="p-8">
            {activeTab === "deposit" ? <DepositForm /> : <WithdrawForm />}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};