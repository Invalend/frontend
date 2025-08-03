import Link from 'next/link';
import { ArrowRight, Book, Zap, HelpCircle, Code, Settings } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Invalend Protocol
            <span className="block text-2xl md:text-3xl text-teal-400 font-normal mt-2">
              Documentation Hub
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to build, integrate, and use the Invalend DeFi leverage protocol. 
            From quick start guides to advanced smart contract documentation.
          </p>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link
          href="/docs/introduction"
          className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-teal-500/30 hover:bg-gray-900/80 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
              <Book className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Introduction</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Learn about Invalend Protocol&apos;s architecture, features, and how it revolutionizes DeFi leverage trading.
          </p>
          <div className="flex items-center text-teal-400 text-sm font-medium group-hover:gap-2 transition-all">
            Get started <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
          </div>
        </Link>

        <Link
          href="/docs/quick-start"
          className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-teal-500/30 hover:bg-gray-900/80 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
              <Zap className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Start</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Get up and running with Invalend in minutes. Connect your wallet and start trading with leverage.
          </p>
          <div className="flex items-center text-teal-400 text-sm font-medium group-hover:gap-2 transition-all">
            Start now <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
          </div>
        </Link>

        <Link
          href="/docs/dashboard"
          className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-teal-500/30 hover:bg-gray-900/80 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
              <Settings className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Dashboard Guide</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Master the Invalend dashboard interface and learn to navigate all features efficiently.
          </p>
          <div className="flex items-center text-teal-400 text-sm font-medium group-hover:gap-2 transition-all">
            Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
          </div>
        </Link>
      </div>

      {/* Documentation Sections */}
      <div className="not-prose space-y-8">
        <h2 className="text-2xl font-bold text-white">Documentation Sections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Getting Started */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Book className="w-6 h-6 text-teal-400" />
              <h3 className="text-xl font-semibold text-white">Getting Started</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Essential guides to get you started with Invalend Protocol
            </p>
            <div className="space-y-2">
              <Link href="/docs/introduction" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Introduction
              </Link>
              <Link href="/docs/quick-start" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Quick Start Guide
              </Link>
              <Link href="/docs/installation" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Installation & Setup
              </Link>
              <Link href="/docs/configuration" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Configuration
              </Link>
            </div>
          </div>

          {/* Core Features */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-teal-400" />
              <h3 className="text-xl font-semibold text-white">Core Features</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Deep dive into Invalend&apos;s main features and capabilities
            </p>
            <div className="space-y-2">
              <Link href="/docs/dashboard" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Dashboard Overview
              </Link>
              <Link href="/docs/pool" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Liquidity Pool (Earn)
              </Link>
              <Link href="/docs/loans" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Borrowing (Leverage)
              </Link>
              <Link href="/docs/trading" className="block text-teal-400 hover:text-teal-300 text-sm">
                → Trading (Uniswap)
              </Link>
            </div>
          </div>

          {/* User Guides */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-400">User Guides</h3>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-500">Coming Soon</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Step-by-step tutorials for common tasks and workflows
            </p>
            <div className="space-y-2 opacity-50">
              <div className="text-gray-500 text-sm">→ How to Deposit & Earn</div>
              <div className="text-gray-500 text-sm">→ How to Borrow</div>
              <div className="text-gray-500 text-sm">→ How to Trade</div>
              <div className="text-gray-500 text-sm">→ How to Manage Positions</div>
            </div>
          </div>

          {/* Smart Contracts */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-400">Smart Contracts</h3>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-500">Coming Soon</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Technical documentation for developers and integrators
            </p>
            <div className="space-y-2 opacity-50">
              <div className="text-gray-500 text-sm">→ Contract Architecture</div>
              <div className="text-gray-500 text-sm">→ Lending Pool</div>
              <div className="text-gray-500 text-sm">→ Loan Manager</div>
              <div className="text-gray-500 text-sm">→ Collateral Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="not-prose mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/20 border border-teal-500/30 rounded-full">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <span className="text-teal-400 text-sm font-medium">
            Documentation is actively being developed • More sections coming soon
          </span>
        </div>
      </div>
    </div>
  );
}