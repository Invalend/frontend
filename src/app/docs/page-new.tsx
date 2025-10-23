"use client";

import Link from 'next/link';
import { Book, Zap, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export default function DocsHomePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-full px-4 py-2 text-sm text-teal-400">
          <Book className="w-4 h-4" />
          Documentation Hub
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Invalend Protocol
          <span className="block text-2xl md:text-3xl text-teal-400 mt-2">
            Developer Documentation
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Complete guide to building with Invalend Protocol. Learn how to integrate 
          <span className="text-teal-400 font-semibold"> leveraged DeFi positions</span>, 
          manage liquidity pools, and create custom trading strategies.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/docs/introduction"
          className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center group-hover:bg-teal-500/30 transition-all">
              <Book className="w-6 h-6 text-teal-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                Get Started
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                New to Invalend? Start here to understand the protocol fundamentals and core concepts.
              </p>
              <div className="flex items-center text-teal-500 text-sm font-medium">
                Start Reading
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/docs/quick-start"
          className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center group-hover:bg-teal-500/30 transition-all">
              <Zap className="w-6 h-6 text-teal-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                Quick Start
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Jump right in with practical examples and step-by-step integration guides.
              </p>
              <div className="flex items-center text-teal-500 text-sm font-medium">
                Start Building
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Available Documentation */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Available Documentation</h2>
          <p className="text-gray-400">
            Navigate through our comprehensive guides using the sidebar or quick links below
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/docs/introduction"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors group"
          >
            <CheckCircle className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="text-teal-400 font-semibold mb-1">📚 Introduction</div>
            <div className="text-gray-300 text-sm">Protocol overview</div>
          </Link>
          
          <Link
            href="/docs/pool"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors group"
          >
            <CheckCircle className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="text-teal-400 font-semibold mb-1">💰 Earn</div>
            <div className="text-gray-300 text-sm">Liquidity pools</div>
          </Link>
          
          <Link
            href="/docs/loans"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors group"
          >
            <CheckCircle className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="text-teal-400 font-semibold mb-1">📈 Borrow</div>
            <div className="text-gray-300 text-sm">Leveraged trading</div>
          </Link>
          
          <Link
            href="/docs/trading"
            className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 text-center hover:bg-teal-500/30 transition-colors group"
          >
            <CheckCircle className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="text-teal-400 font-semibold mb-1">🔄 Trading</div>
            <div className="text-gray-300 text-sm">Uniswap integration</div>
          </Link>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-orange-400">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">More Documentation Coming Soon</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We&apos;re actively working on expanding our documentation. 
            Check the sidebar to see what&apos;s available now and what&apos;s coming next.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-gray-800 px-3 py-1 rounded-full">Smart Contracts</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">API Reference</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">Security Guide</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">Troubleshooting</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <span className="text-teal-400 text-sm font-medium">
            Documentation is being actively developed
          </span>
        </div>
      </div>
    </div>
  );
}
