"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, X, Book, Zap, Settings, Code, HelpCircle, Users } from 'lucide-react';

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  available?: boolean;
}

const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    icon: <Book className="w-4 h-4" />,
    children: [
      { title: 'Introduction', href: '/docs/introduction', available: true },
      { title: 'Quick Start', href: '/docs/quick-start', available: true },
      { title: 'Installation', href: '/docs/installation', available: true },
      { title: 'Configuration', href: '/docs/configuration', available: true }
    ]
  },
  {
    title: 'Core Features',
    icon: <Zap className="w-4 h-4" />,
    children: [
      { title: 'Dashboard Overview', href: '/docs/dashboard', available: true },
      { title: 'Liquidity Pool (Earn)', href: '/docs/pool', available: true },
      { title: 'Borrowing (Leverage)', href: '/docs/loans', available: true },
      { title: 'Trading (Uniswap)', href: '/docs/trading', available: true },
      { title: 'Restricted Wallet', href: '#', available: false },
      { title: 'Faucet (Testnet)', href: '#', available: false }
    ]
  },
  {
    title: 'User Guides',
    icon: <HelpCircle className="w-4 h-4" />,
    children: [
      { title: 'How to Deposit & Earn', href: '#', available: false },
      { title: 'How to Borrow', href: '#', available: false },
      { title: 'How to Trade', href: '#', available: false },
      { title: 'How to Manage Positions', href: '#', available: false },
      { title: 'Understanding Collateral', href: '#', available: false }
    ]
  },
  {
    title: 'Smart Contracts',
    icon: <Code className="w-4 h-4" />,
    children: [
      { title: 'Contract Architecture', href: '#', available: false },
      { title: 'Lending Pool', href: '#', available: false },
      { title: 'Loan Manager', href: '#', available: false },
      { title: 'Collateral Manager', href: '#', available: false },
      { title: 'Restricted Wallet Factory', href: '#', available: false }
    ]
  },
  {
    title: 'API Reference',
    icon: <Settings className="w-4 h-4" />,
    children: [
      { title: 'React Hooks', href: '#', available: false },
      { title: 'Contract Interfaces', href: '#', available: false },
      { title: 'Event Handlers', href: '#', available: false },
      { title: 'Configuration Options', href: '#', available: false }
    ]
  },
  {
    title: 'Community',
    icon: <Users className="w-4 h-4" />,
    children: [
      { title: 'Contributing', href: '#', available: false },
      { title: 'Bug Reports', href: '#', available: false },
      { title: 'Feature Requests', href: '#', available: false },
      { title: 'Discord Community', href: '#', available: false }
    ]
  }
];

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started', 'Core Features']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const NavSection = ({ item }: { item: NavItem }) => {
    const isExpanded = expandedSections.includes(item.title);
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            onClick={() => toggleSection(item.title)}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isExpanded && item.children && (
            <div className="ml-6 space-y-1">
              {item.children.map((child) => (
                <NavItem key={child.title} item={child} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return <NavItem item={item} />;
  };

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    const isAvailable = item.available !== false;

    if (!isAvailable) {
      return (
        <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-500 rounded-lg">
          <span>{item.title}</span>
          <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">Coming Soon</span>
        </div>
      );
    }

    if (!item.href || item.href === '#') {
      return (
        <div className="px-3 py-2 text-sm text-gray-500 rounded-lg">
          {item.title}
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
          isActive
            ? 'bg-teal-500/20 text-teal-400 border-l-2 border-teal-500'
            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        {item.title}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-black rounded transform rotate-45"></div>
          </div>
          <span className="text-lg font-semibold text-white">Docs</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavSection key={item.title} item={item} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span>Documentation v1.0</span>
          </div>
          <p>Invalend Protocol</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 bg-gray-900 border-r border-gray-800 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 bg-gray-900 border-r border-gray-800 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
