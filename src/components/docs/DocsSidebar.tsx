"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronRight, FileText, Book, Zap, Code, Shield, Users, HelpCircle, ExternalLink, Menu, X, LucideIcon } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  available: boolean;
  external?: boolean;
}

interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

const docsNavigation: NavSection[] = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { title: 'Introduction', href: '/docs/introduction', available: true },
      { title: 'Quick Start', href: '/docs/quick-start', available: true },
      { title: 'Installation', href: '/docs/installation', available: true },
      { title: 'Configuration', href: '/docs/configuration', available: true }
    ]
  },
  {
    title: 'Core Features',
    icon: Zap,
    items: [
      { title: 'Dashboard Overview', href: '/docs/dashboard', available: true },
      { title: 'Liquidity Pool (Earn)', href: '/docs/pool', available: true },
      { title: 'Borrowing (Leverage)', href: '/docs/loans', available: true },
      { title: 'Trading (Uniswap)', href: '/docs/trading', available: true },
      { title: 'Restricted Wallet', href: '/docs/wallet', available: false },
      { title: 'Faucet (Testnet)', href: '/docs/faucet', available: false }
    ]
  },
  {
    title: 'User Guides',
    icon: Users,
    items: [
      { title: 'How to Deposit & Earn', href: '/docs/guides/deposit', available: false },
      { title: 'How to Borrow', href: '/docs/guides/borrow', available: false },
      { title: 'How to Trade', href: '/docs/guides/trade', available: false },
      { title: 'How to Manage Positions', href: '/docs/guides/positions', available: false },
      { title: 'Understanding Collateral', href: '/docs/guides/collateral', available: false }
    ]
  },
  {
    title: 'Smart Contracts',
    icon: Code,
    items: [
      { title: 'Contract Architecture', href: '/docs/contracts/architecture', available: false },
      { title: 'Lending Pool', href: '/docs/contracts/lending-pool', available: false },
      { title: 'Loan Manager', href: '/docs/contracts/loan-manager', available: false },
      { title: 'Collateral Manager', href: '/docs/contracts/collateral-manager', available: false },
      { title: 'Restricted Wallet Factory', href: '/docs/contracts/wallet-factory', available: false }
    ]
  },
  {
    title: 'API Reference',
    icon: FileText,
    items: [
      { title: 'React Hooks', href: '/docs/api/hooks', available: false },
      { title: 'Smart Contract ABIs', href: '/docs/api/abis', available: false },
      { title: 'Event Types', href: '/docs/api/events', available: false },
      { title: 'Error Handling', href: '/docs/api/errors', available: false }
    ]
  },
  {
    title: 'Security & Best Practices',
    icon: Shield,
    items: [
      { title: 'Security Overview', href: '/docs/security/overview', available: false },
      { title: 'Audit Reports', href: '/docs/security/audits', available: false },
      { title: 'Best Practices', href: '/docs/security/best-practices', available: false },
      { title: 'Risk Management', href: '/docs/security/risk-management', available: false }
    ]
  },
  {
    title: 'Troubleshooting',
    icon: HelpCircle,
    items: [
      { title: 'Common Issues', href: '/docs/troubleshooting/common-issues', available: false },
      { title: 'Error Messages', href: '/docs/troubleshooting/errors', available: false },
      { title: 'Network Issues', href: '/docs/troubleshooting/network', available: false },
      { title: 'Wallet Connection', href: '/docs/troubleshooting/wallet', available: false }
    ]
  },
  {
    title: 'Community & Support',
    icon: Users,
    items: [
      { title: 'Discord Community', href: '#', available: false, external: true },
      { title: 'GitHub Repository', href: '#', available: false, external: true },
      { title: 'Bug Reports', href: '#', available: false, external: true },
      { title: 'Feature Requests', href: '#', available: false, external: true }
    ]
  }
];

interface DocsSidebarProps {
  className?: string;
}

export default function DocsSidebar({ className = '' }: DocsSidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className={`w-64 flex-shrink-0 ${className}`}>
      <div className="h-full bg-[#0A0A0A] backdrop-blur-sm border-r border-[rgba(6,182,212,0.15)]">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-lg font-normal text-white mb-2" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px'
            }}>Documentation</h2>
            <p className="text-sm text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              Complete guide to Invalend Protocol
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {docsNavigation.map((section) => {
              const Icon = section.icon;
              
              return (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#06B6D4]" />
                    <h3 className="text-sm font-normal text-white" style={{ fontFamily: 'Space Grotesk' }}>
                      {section.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-1 ml-6">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const isAvailable = item.available;
                      
                      return (
                        <li key={item.title}>
                          {isAvailable ? (
                            <Link
                              href={item.href}
                              className={`flex items-center justify-between group py-2 px-3 rounded-lg text-sm transition-all duration-200 font-normal ${
                                isActive
                                  ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-l-2 border-[#06B6D4]'
                                  : 'text-[#A3A3A3] hover:text-white hover:bg-[#1E1E1E]/50'
                              }`}
                              style={{ fontFamily: 'Space Grotesk' }}
                            >
                              <span>{item.title}</span>
                              {item.external && (
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                              {isActive && (
                                <ChevronRight className="w-3 h-3 text-[#06B6D4]" />
                              )}
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between py-2 px-3 text-sm text-[#A3A3A3] cursor-not-allowed font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                              <span>{item.title}</span>
                              <span className="text-xs bg-[#1E1E1E] px-2 py-1 rounded text-[#A3A3A3] font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                                Soon
                              </span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[rgba(6,182,212,0.15)]">
            <div className="text-xs text-[#A3A3A3] space-y-2 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#06B6D4] rounded-full animate-pulse"></div>
                <span>Live Documentation</span>
              </div>
              <p>Updated regularly with new features and guides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0A0A0A] border border-[rgba(6,182,212,0.15)] rounded-lg text-white hover:bg-[#1E1E1E] transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-64 flex-shrink-0 ${className}`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-64 h-full">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-[#0A0A0A] border border-[rgba(6,182,212,0.15)] rounded-lg text-white hover:bg-[#1E1E1E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
