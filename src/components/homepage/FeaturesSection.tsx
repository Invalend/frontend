'use client';

import { Lock, Eye, Shield, Zap, Activity } from 'lucide-react';
import { useAnimation } from '@/hooks';

export default function FeaturesSection() {
  const { ref: featuresRef, isVisible } = useAnimation({
    preset: 'fadeIn',
    threshold: 0.1
  });

  const features = [
    {
      icon: Lock,
      title: 'Chain-enforced restrictions',
      description: 'No trust. Just code. Whitelisted protocols only. No external transfers. Borrowers execute within guardrails.',
      isHero: true,
      highlight: 'CORE INNOVATION'
    },
    {
      icon: Eye,
      title: 'Complete transparency',
      description: 'Every transaction visible. Every position monitored. Every action recorded. No opacity. No surprises.',
      highlight: 'TRANSPARENT'
    },
    {
      icon: Shield,
      title: 'Auto-liquidation at 80%',
      description: 'Chainlink oracles trigger closure before LP capital threatened. Automated. Reliable. No human error.',
      highlight: 'AUTOMATED'
    },
    {
      icon: Zap,
      title: 'ERC-4626 standard vaults',
      description: 'Battle-tested token standard. Composable with DeFi ecosystem. Share-based accounting built-in.',
      highlight: 'STANDARDIZED'
    },
    {
      icon: Activity,
      title: 'Built on Base',
      description: 'Coinbase L2. Institutional infrastructure. Low fees. Fast finality. Production ready.',
      highlight: 'SCALABLE'
    },
    {
      icon: Shield,
      title: 'Principal protection',
      description: 'LPs protected by liquidation threshold. Borrower collateral absorbs first loss. Math enforces safety.',
      highlight: 'PROTECTED'
    }
  ];

  return (
    <section 
      ref={featuresRef}
      id="features-section"
      className="relative overflow-hidden"
      style={{ 
        background: '#141414',
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
            Six features.
            <br />
            <span style={{ color: '#06B6D4' }}>Zero trust required.</span>
          </h2>

        </div>

        {/* Features Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Hero Feature - Spans 2 rows on desktop */}
          <div 
            className="lg:col-span-6 lg:row-span-2"
            style={{ 
              background: '#1E1E1E',
              border: '1px solid rgba(6, 182, 212, 0.15)',
              borderRadius: '8px',
              padding: '48px'
            }}
          >
            {/* Icon */}
            <div 
              className="w-20 h-20 rounded-lg flex items-center justify-center mb-8"
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
            >
              <Lock className="w-10 h-10" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
            </div>

            {/* Badge */}
            <div 
              className="inline-block px-3 py-1 rounded-full mb-6"
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                fontSize: '12px',
                color: '#06B6D4',
                fontWeight: '400',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {features[0].highlight}
            </div>
            
            {/* Title */}
            <h3 
              style={{ 
                fontSize: '48px', 
                fontWeight: '400',
                letterSpacing: '-2px',
                lineHeight: '1.1',
                color: '#FFFFFF',
                marginBottom: '24px'
              }}
            >
              Chain-enforced
              <br />
              restrictions
            </h3>
            
            {/* Description */}
            <p 
              style={{ 
                fontSize: '18px', 
                lineHeight: '1.7',
                color: '#A3A3A3',
                fontWeight: '400',
                marginBottom: '32px'
              }}
            >
              No trust. Just code.
              <br /><br />
              Whitelisted protocols only. No external transfers. 
              Borrowers execute within guardrails. Restrictions enforced 
              at transaction level. Not suggestions. Hard rules.
            </p>

            {/* Feature List */}
            <div className="space-y-3">
              {['Protocol whitelist enforcement', 'Transaction-level validation', 'No escape hatches'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
                  <span style={{ fontSize: '15px', color: '#A3A3A3', fontWeight: '400' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Regular Features - 2x2 Grid on right */}
          {features.slice(1).map((feature) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={feature.title}
                className="lg:col-span-6"
                style={{ 
                  background: '#1E1E1E',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '32px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.15)';
                }}
              >
                {/* Header with Highlight Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.15)'
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                  </div>
                  
                  <div 
                    className="px-2 py-1 rounded-full"
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
                    {feature.highlight}
                  </div>
                </div>
                
                {/* Title */}
                <h3 
                  style={{ 
                    fontSize: '24px', 
                    fontWeight: '400',
                    letterSpacing: '-0.5px',
                    lineHeight: '1.2',
                    color: '#FFFFFF',
                    marginBottom: '12px'
                  }}
                >
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p 
                  style={{ 
                    fontSize: '15px', 
                    lineHeight: '1.7',
                    color: '#A3A3A3',
                    fontWeight: '400'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>


      </div>
    </section>
  );
}