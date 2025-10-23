'use client';

import { Database, Shield, Users, Zap, Layers, CheckCircle } from 'lucide-react';
import { useAnimation } from '@/hooks';

export default function ArchitectureOverview() {
  const { ref: architectureRef, isVisible } = useAnimation({
    preset: 'fadeIn',
    threshold: 0.1
  });

  const layers = [
    {
      name: 'Execution Interface',
      icon: Users,
      description: 'Zero-trust user experience',
      components: ['Next.js Frontend', 'Web3 Wallet Integration', 'Real-time Position Monitoring', 'Transaction Execution'],
      highlight: 'INTERFACE'
    },
    {
      name: 'Smart Contract Core',
      icon: Shield,
      description: 'Chain-enforced restrictions',
      components: ['LendingPool Contract', 'LoanManager Logic', 'CollateralManager', 'RestrictedWallet', 'Protocol Whitelist'],
      highlight: 'CORE'
    },
    {
      name: 'Oracle & Risk Engine',
      icon: Database,
      description: 'Automated risk management',
      components: ['Chainlink Price Feeds', 'Auto-liquidation Engine', 'Health Factor Monitoring', 'Risk Assessment'],
      highlight: 'SECURITY'
    },
    {
      name: 'DEX Integration Hub',
      icon: Zap,
      description: 'Whitelisted protocol execution',
      components: ['Uniswap V3 Integration', 'Token Whitelist', 'Swap Execution', 'Slippage Protection'],
      highlight: 'EXECUTION'
    }
  ];

  return (
    <section 
      ref={architectureRef}
      id="architecture-section"
      className="relative overflow-hidden"
      style={{ 
        background: '#0A0A0A',
        padding: '80px 0',
        transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        ...(isVisible ? {} : { opacity: 0, transform: 'translateY(20px)' })
      }}
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.002]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Heading - Bold & Declarative */}
        <div className="text-center mb-16">
          <h2 
            style={{ 
              fontSize: '72px', 
              fontWeight: '400',
              letterSpacing: '-3px',
              lineHeight: '1.05',
              color: '#FFFFFF',
              marginBottom: '24px'
            }}
          >
            Trustless by design.
            <br />
            <span style={{ color: '#06B6D4' }}>Protected by code</span>
          </h2>

        </div>

        {/* Architecture Diagram */}
        <div 
          className={`relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transition: 'all 0.8s ease-out 0.6s',
            transitionDelay: '0.6s'
          }}
        >
          {/* Vertical Flow Lines */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full"
            style={{ background: 'rgba(6, 182, 212, 0.15)' }}
          />
          
          {/* Layer Cards */}
          <div className="space-y-8">
            {layers.map((layer, index) => {
              const IconComponent = layer.icon;
              const delay = 0.8 + (index * 0.2);
              
              return (
                <div
                  key={layer.name}
                  className={`relative ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ 
                    transition: `all 0.6s ease-out ${delay}s`,
                    transitionDelay: `${delay}s`
                  }}
                >
                  {/* Connection Line */}
                  {index < layers.length - 1 && (
                    <div 
                      className="absolute left-1/2 top-full transform -translate-x-1/2 w-1 h-8"
                      style={{ background: 'rgba(6, 182, 212, 0.15)' }}
                    />
                  )}
                  
                  {/* Layer Card */}
                  <div 
                    className="relative mx-auto max-w-4xl transition-all duration-300"
                    style={{
                      background: '#141414',
                      border: '1px solid rgba(6, 182, 212, 0.15)',
                      borderRadius: '8px',
                      padding: '48px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                    }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-6">
                        <div 
                          className="p-4 rounded-lg flex items-center justify-center"
                          style={{ 
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.15)'
                          }}
                        >
                          <IconComponent className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 
                            className="mb-2"
                            style={{ 
                              fontSize: '24px', 
                              fontWeight: '400',
                              letterSpacing: '-0.5px',
                              lineHeight: '1.2',
                              color: '#FFFFFF'
                            }}
                          >
                            {layer.name}
                          </h3>
                          <p 
                            style={{ 
                              fontSize: '15px', 
                              lineHeight: '1.7',
                              color: '#A3A3A3',
                              fontWeight: '400'
                            }}
                          >
                            {layer.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Layer Highlight Badge */}
                      <div className="flex flex-col items-end gap-2">
                        <div 
                          className="px-3 py-1 rounded-full"
                          style={{ 
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.15)',
                            fontSize: '10px',
                            color: '#06B6D4',
                            fontWeight: '400',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {layer.highlight}
                        </div>
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ 
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.15)',
                            color: '#06B6D4',
                            fontSize: '16px',
                            fontWeight: '400'
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Components List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {layer.components.map((component, compIndex) => (
                        <div
                          key={component}
                          className={`flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                          }`}
                          style={{ 
                            background: '#1E1E1E',
                            border: '1px solid rgba(6, 182, 212, 0.1)',
                            transition: `all 0.4s ease-out ${delay + 0.1 + (compIndex * 0.1)}s`,
                            transitionDelay: `${delay + 0.1 + (compIndex * 0.1)}s`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.1)';
                          }}
                        >
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#06B6D4' }} />
                          <span 
                            className="text-sm font-medium"
                            style={{ color: '#A3A3A3' }}
                          >
                            {component}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Highlights - Bold & Future-facing */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="text-center p-8 rounded-lg transition-all duration-300"
              style={{
                background: '#141414',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
              }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center"
                style={{ 
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.15)'
                }}
              >
                <Layers className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
              </div>
              <h4 
                className="mb-4"
                style={{ 
                  fontSize: '24px', 
                  fontWeight: '400',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2',
                  color: '#FFFFFF'
                }}
              >
                Modular by design
              </h4>
              <p 
                style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.7',
                  color: '#A3A3A3',
                  fontWeight: '400'
                }}
              >
                Each layer operates independently. Clear interfaces. 
                <span style={{ color: '#06B6D4' }}>No single point of failure.</span>
              </p>
            </div>
            
            <div 
              className="text-center p-8 rounded-lg transition-all duration-300"
              style={{
                background: '#141414',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
              }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center"
                style={{ 
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.15)'
                }}
              >
                <Shield className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
              </div>
              <h4 
                className="mb-4"
                style={{ 
                  fontSize: '24px', 
                  fontWeight: '400',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2',
                  color: '#FFFFFF'
                }}
              >
                Security through code
              </h4>
              <p 
                style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.7',
                  color: '#A3A3A3',
                  fontWeight: '400'
                }}
              >
                Automated risk management. Auto-liquidation at 80%.
                <span style={{ color: '#06B6D4' }}>No human intervention.</span>
              </p>
            </div>
            
            <div 
              className="text-center p-8 rounded-lg transition-all duration-300"
              style={{
                background: '#141414',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
              }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center"
                style={{ 
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.15)'
                }}
              >
                <Zap className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
              </div>
              <h4 
                className="mb-4"
                style={{ 
                  fontSize: '24px', 
                  fontWeight: '400',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2',
                  color: '#FFFFFF'
                }}
              >
                Built for scale
              </h4>
              <p 
                style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.7',
                  color: '#A3A3A3',
                  fontWeight: '400'
                }}
              >
                Base L2 optimized. Minimal gas costs. 
                <span style={{ color: '#06B6D4' }}>Institutional-grade performance.</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
