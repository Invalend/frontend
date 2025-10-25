import Link from 'next/link';
import { ArrowRight, Lightbulb, Target, Cpu, Zap, CheckCircle } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="prose prose-invert max-w-none" style={{ background: '#0A0A0A' }}>
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-4 py-2 text-sm text-cyan-400">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            Hackathon Project
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Invalend Protocol
            <span className="block text-2xl md:text-3xl text-cyan-400 font-normal mt-2">
              Safe-Leverage DeFi Protocol
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A safe-leverage protocol that allows traders to unlock 5x buying power using only 20% of their own capital. 
            The rest is transparently provided by a shared liquidity pool with full trading control within restricted smart wallets.
          </p>
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link
          href="/docs/overview"
          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 hover:from-cyan-500/5 hover:to-cyan-600/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
              <Lightbulb className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Overview</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Learn about Invalend&apos;s safe-leverage protocol and how it transforms capital efficiency for traders and LPs.
          </p>
          <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
            Get started <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
          </div>
        </Link>

        <Link
          href="/docs/problem-solution"
          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 hover:from-cyan-500/5 hover:to-cyan-600/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Problem & Solution</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Understand the current DeFi leverage problems and how Invalend&apos;s 20/80 model solves them.
          </p>
          <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
            Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
          </div>
        </Link>

        <Link
          href="/docs/features"
          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 hover:from-cyan-500/5 hover:to-cyan-600/5 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Features</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Explore Invalend&apos;s key features including restricted wallets, LP protection, and on-chain automation.
          </p>
          <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
            Explore features <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
          </div>
        </Link>
      </div>

      {/* Documentation Sections */}
      <div className="not-prose space-y-8">
        <h2 className="text-2xl font-bold text-white">Documentation Sections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Overview */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Project Overview</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              High-level understanding of Invalend Protocol and its value proposition
            </p>
            <div className="space-y-2">
              <Link href="/docs/overview" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Overview
              </Link>
              <Link href="/docs/problem-solution" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Problem & Solution
              </Link>
              <Link href="/docs/features" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Features
              </Link>
            </div>
          </div>

          {/* Core Concepts */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Core Concepts</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Deep dive into Invalend&apos;s core concepts and technical principles
            </p>
            <div className="space-y-2">
              <Link href="/docs/core-concept" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Core Concept & Definition
              </Link>
              <Link href="/docs/core-principles" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Core Principles
              </Link>
              <Link href="/docs/architecture" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Architecture
              </Link>
              <Link href="/docs/core-flow" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Core Flow
              </Link>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Technical Details</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Technical implementation and smart contract details
            </p>
            <div className="space-y-2">
              <Link href="/docs/smart-contracts" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Smart Contracts
              </Link>
              <Link href="/docs/frontend" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Frontend Implementation
              </Link>
              <Link href="/docs/integration" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Integration Guide
              </Link>
            </div>
          </div>

          {/* Demo & Testing */}
          <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">Demo & Testing</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Live demo and user journey guides
            </p>
            <div className="space-y-2">
              <Link href="/docs/demo" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → Live Demo
              </Link>
              <Link href="/docs/user-journey" className="block text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                → User Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="not-prose mt-12 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Key Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-cyan-400 font-semibold mb-1">5x Leverage</div>
            <div className="text-gray-300 text-sm">With only 20% margin</div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-cyan-400 font-semibold mb-1">LP Protection</div>
            <div className="text-gray-300 text-sm">Losses never exceed margin</div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-cyan-400 font-semibold mb-1">Restricted Wallets</div>
            <div className="text-gray-300 text-sm">Zero unauthorized loss vectors</div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-cyan-400 font-semibold mb-1">On-Chain</div>
            <div className="text-gray-300 text-sm">Fully transparent execution</div>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="not-prose mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-cyan-400 text-sm font-medium">
            MVP deployed on Base Sepolia • Ready for hackathon demo
          </span>
        </div>
      </div>
    </div>
  );
}
