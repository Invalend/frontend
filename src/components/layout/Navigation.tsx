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
    <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex items-center space-x-1">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center">
                                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`relative px-6 py-4 text-base font-medium transition-all duration-300 group ${
                    activeTab === tab.id
                      ? 'text-teal-400'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="tracking-wide">{tab.label}</span>
                    <span className={`text-xs font-normal transition-colors ${
                      activeTab === tab.id ? 'text-teal-500/70' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {tab.description}
                    </span>
                  </div>
                  
                  {/* Active state indicator - APY style */}
                  {activeTab === tab.id && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-600/5 rounded-lg border border-teal-500/20"></div>
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                    </>
                  )}
                  
                  {/* Hover effect - APY style */}
                  <div className="absolute inset-0 bg-gray-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                {/* Separator */}
                {index < tabs.length - 1 && (
                  <div className="h-8 w-px bg-gray-700/50 mx-0.5"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 