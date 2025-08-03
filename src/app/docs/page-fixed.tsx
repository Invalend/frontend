"use client";

import { useState } from 'react';
import Link from 'next/link';

const docsStructure = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction', available: true },
      { title: 'Quick Start', href: '/docs/quick-start', available: true },
      { title: 'Installation', href: '/docs/installation', available: true },
      { title: 'Configuration', href: '/docs/configuration', available: true }
    ]
  },
  {
    title: 'Core Features',
    items: [
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
    items: [
      { title: 'How to Deposit & Earn', href: '#', available: false },
      { title: 'How to Borrow', href: '#', available: false },
      { title: 'How to Trade', href: '#', available: false },
      { title: 'How to Manage Positions', href: '#', available: false },
      { title: 'Understanding Collateral', href: '#', available: false }
    ]
  },
  {
    title: 'Smart Contracts',
    items: [
      { title: 'Contract Architecture', href: '#', available: false },
      { title: 'Lending Pool', href: '#', available: false },
      { title: 'Loan Manager', href: '#', available: false },
      { title: 'Collateral Manager', href: '#', available: false },
      { title: 'Restricted Wallet Factory', href: '#', available: false }
    ]
  },
  {
    title: 'API Reference',
    items: [
      { title: 'React Hooks', href: '#', available: false },
      { title: 'Components', href: '#', available: false },
      { title: 'Utilities', href: '#', available: false },
      { title: 'Types & Interfaces', href: '#', available: false }
    ]
  },
  {
    title: 'Development',
    items: [
      { title: 'Architecture', href: '#', available: false },
      { title: 'Component Structure', href: '#', available: false },
      { title: 'State Management', href: '#', available: false },
      { title: 'Styling Guide', href: '#', available: false },
      { title: 'Testing', href: '#', available: false }
    ]
  },
  {
    title: 'Security',
    items: [
      { title: 'Security Model', href: '#', available: false },
      { title: 'Audit Reports', href: '#', available: false },
      { title: 'Best Practices', href: '#', available: false },
      { title: 'Bug Bounty', href: '#', available: false }
    ]
  },
  {
    title: 'Advanced',
    items: [
      { title: 'Integration Guide', href: '#', available: false },
      { title: 'Custom Implementations', href: '#', available: false },
      { title: 'Performance Optimization', href: '#', available: false },
      { title: 'Troubleshooting', href: '#', available: false }
    ]
  }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = docsStructure.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Invalend Protocol Documentation
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Complete guide to building, using, and integrating with Invalend - 
          a decentralized leverage trading platform built on EigenLayer
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Documentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((section, index) => (
          <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.available ? (
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-teal-400 transition-colors block py-1 text-sm"
                    >
                      → {item.title}
                    </Link>
                  ) : (
                    <div className="text-gray-600 block py-1 text-sm flex items-center gap-2">
                      → {item.title}
                      <span className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-12 bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Available Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link
            href="/docs/introduction"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">📚 Introduction</div>
            <div className="text-gray-300 text-sm">Learn about Invalend</div>
          </Link>
          <Link
            href="/docs/quick-start"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">🚀 Quick Start</div>
            <div className="text-gray-300 text-sm">Get started in 5 minutes</div>
          </Link>
          <Link
            href="/docs/dashboard"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">📊 Dashboard</div>
            <div className="text-gray-300 text-sm">Interface overview</div>
          </Link>
          <Link
            href="/docs/pool"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">💰 Earn</div>
            <div className="text-gray-300 text-sm">Liquidity pools</div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/docs/loans"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">📈 Borrow</div>
            <div className="text-gray-300 text-sm">Leveraged trading</div>
          </Link>
          <Link
            href="/docs/trading"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">🔄 Trading</div>
            <div className="text-gray-300 text-sm">Uniswap integration</div>
          </Link>
          <Link
            href="/docs/installation"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors"
          >
            <div className="text-teal-400 font-semibold mb-2">⚙️ Setup</div>
            <div className="text-gray-300 text-sm">Installation guide</div>
          </Link>
        </div>
      </div>

      {/* Status */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <span className="text-teal-400 text-sm font-medium">
            Documentation is being actively developed - More sections coming soon
          </span>
        </div>
      </div>
    </div>
  );
}
