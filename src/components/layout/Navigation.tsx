"use client";


type TabType = 'pool' | 'loans' | 'dashboard' | 'faucet' | 'trading' | 'wallet' | 'docs';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { 
      id: 'dashboard' as TabType, 
      label: 'Dashboard', 
      description: 'Overview'
    },
    { 
      id: 'pool' as TabType, 
      label: 'Earn', 
      description: 'Liquidity Pool'
    },
    { 
      id: 'loans' as TabType, 
      label: 'Borrow', 
      description: 'Leverage'
    },
    { 
      id: 'trading' as TabType, 
      label: 'Trade', 
      description: 'Uniswap'
    },
    { 
      id: 'wallet' as TabType, 
      label: 'Wallet', 
      description: 'Control'
    },
    { 
      id: 'faucet' as TabType, 
      label: 'Faucet', 
      description: 'Testnet'
    },
    { 
      id: 'docs' as TabType, 
      label: 'Docs', 
      description: 'Guide'
    },
  ];

  return (
    <nav className="bg-[#0A0A0A] border-b border-[rgba(6,182,212,0.15)]">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-center">
          <div className="flex items-center space-x-1">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`relative px-6 py-4 text-base font-normal transition-colors group ${
                    activeTab === tab.id ? 'text-[#06B6D4]' : 'text-[#A3A3A3] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="tracking-wide">{tab.label}</span>
                    <span className={`text-xs font-normal transition-colors ${
                      activeTab === tab.id ? 'text-[#06B6D4]' : 'text-[#A3A3A3]'
                    }`} style={{ fontFamily: 'Space Grotesk' }}>
                      {tab.description}
                    </span>
                  </div>
                  {/* Active indicator: subtle 1px border per style guide */}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 rounded-lg border border-[rgba(6,182,212,0.15)]"></div>
                  )}
                </button>
                
                {/* Separator */}
                {index < tabs.length - 1 && (
                  <div className="h-8 w-px bg-[rgba(6,182,212,0.15)] mx-0.5"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 