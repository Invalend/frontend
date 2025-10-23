'use client';

import { Shield, Users, TrendingUp, Eye } from 'lucide-react';
import { useAnimation, useCounter } from '@/hooks';

export default function SolutionSection() {
  const { ref: solutionRef, isVisible } = useAnimation({
    preset: 'fadeIn',
    threshold: 0.1
  });

  const animatedLeverage = useCounter({
    startValue: 0,
    endValue: 5,
    isVisible,
    duration: 'hero',
    easing: 'easeOutQuart'
  });

  const animatedAPY = useCounter({
    startValue: 0,
    endValue: 6,
    isVisible,
    duration: 'hero',
    easing: 'easeOutQuart',
    delay: 200
  });

  const animatedCollateral = useCounter({
    startValue: 0,
    endValue: 20,
    isVisible,
    duration: 'hero',
    easing: 'easeOutQuart',
    delay: 400
  });

  return (
    <section 
      ref={solutionRef}
      id="solution-section"
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
            Introducing
            <br />
            <span style={{ color: '#06B6D4' }}>prefunded leverage</span>
          </h2>

        </div>

        {/* The Mechanism - Flat Visual Flow */}
        <div className="mb-20">
          
          {/* Flow Container */}
          <div className="relative">
            
            {/* Connecting Line */}
            <div 
              className="absolute top-20 left-0 right-0 h-0.5 hidden lg:block"
              style={{ 
                background: 'rgba(6, 182, 212, 0.15)',
                zIndex: 0
              }}
            />

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1: Community */}
              <div 
                style={{ 
                  background: '#141414',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.15)'
                  }}
                >
                  <Users className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                </div>
                
                <div 
                  style={{ 
                    fontSize: '48px', 
                    fontWeight: '400', 
                    letterSpacing: '-2px', 
                    color: '#06B6D4',
                    marginBottom: '8px'
                  }}
                >
                  80%
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: '400',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                    marginBottom: '12px'
                  }}
                >
                  Community
                  <br />
                  pre-funds
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    color: '#A3A3A3',
                    fontWeight: '400'
                  }}
                >
                  LPs deposit capital, earn {animatedAPY}% APY fixed
                </p>
              </div>

              {/* Step 2: Collateral */}
              <div 
                style={{ 
                  background: '#141414',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center'
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
                
                <div 
                  style={{ 
                    fontSize: '48px', 
                    fontWeight: '400', 
                    letterSpacing: '-2px', 
                    color: '#06B6D4',
                    marginBottom: '8px'
                  }}
                >
                  {animatedCollateral}%
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: '400',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                    marginBottom: '12px'
                  }}
                >
                  Borrower
                  <br />
                  deposits
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    color: '#A3A3A3',
                    fontWeight: '400'
                  }}
                >
                  DAOs, traders, institutions put up minimal collateral
                </p>
              </div>

              {/* Step 3: Execution */}
              <div 
                style={{ 
                  background: '#141414',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.15)'
                  }}
                >
                  <TrendingUp className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                </div>
                
                <div 
                  style={{ 
                    fontSize: '48px', 
                    fontWeight: '400', 
                    letterSpacing: '-2px', 
                    color: '#06B6D4',
                    marginBottom: '8px'
                  }}
                >
                  {animatedLeverage}x
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: '400',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                    marginBottom: '12px'
                  }}
                >
                  Leverage
                  <br />
                  deployed
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    color: '#A3A3A3',
                    fontWeight: '400'
                  }}
                >
                  Restricted wallet enforces whitelisted protocols only
                </p>
              </div>

              {/* Step 4: Protection */}
              <div 
                style={{ 
                  background: '#141414',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center'
                }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.15)'
                  }}
                >
                  <Eye className="w-8 h-8" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                </div>
                
                <div 
                  style={{ 
                    fontSize: '48px', 
                    fontWeight: '400', 
                    letterSpacing: '-2px', 
                    color: '#06B6D4',
                    marginBottom: '8px'
                  }}
                >
                  100%
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: '400',
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                    marginBottom: '12px'
                  }}
                >
                  Transparent
                  <br />
                  execution
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    color: '#A3A3A3',
                    fontWeight: '400'
                  }}
                >
                  Every transaction visible. Auto-liquidation at 80%
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Key Differences - Comparison Style */}
        <div 
          style={{ 
            background: '#141414',
            border: '1px solid rgba(6, 182, 212, 0.15)',
            borderRadius: '8px',
            padding: '48px 32px'
          }}
        >
          <h3 
            className="text-center mb-16"
            style={{ 
              fontSize: '48px', 
              fontWeight: '400',
              letterSpacing: '-2px',
              lineHeight: '1.1',
              color: '#FFFFFF'
            }}
          >
            Not like anything
            <br />
            you&apos;ve used before
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* vs Aave */}
            <div className="text-center">
              <div 
                style={{ 
                  fontSize: '14px', 
                  color: '#A3A3A3',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                vs Aave
              </div>
              
              <div 
                style={{ 
                  background: '#1E1E1E',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '24px'
                }}
              >
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: '400',
                    letterSpacing: '-2px',
                    color: '#06B6D4',
                    marginBottom: '12px'
                  }}
                >
                  5x
                </div>
                <div 
                  style={{ 
                    fontSize: '15px',
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  More capital efficient
                </div>
                <div 
                  style={{ 
                    fontSize: '13px',
                    color: '#A3A3A3'
                  }}
                >
                  {animatedCollateral}% vs 150% collateral
                </div>
              </div>
            </div>

            {/* vs Maple */}
            <div className="text-center">
              <div 
                style={{ 
                  fontSize: '14px', 
                  color: '#A3A3A3',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                vs Maple
              </div>
              
              <div 
                style={{ 
                  background: '#1E1E1E',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '24px'
                }}
              >
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: '400',
                    letterSpacing: '-2px',
                    color: '#06B6D4',
                    marginBottom: '12px'
                  }}
                >
                  100%
                </div>
                <div 
                  style={{ 
                    fontSize: '15px',
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  Fully transparent
                </div>
                <div 
                  style={{ 
                    fontSize: '13px',
                    color: '#A3A3A3'
                  }}
                >
                  On-chain vs off-chain opacity
                </div>
              </div>
            </div>

            {/* Better for LPs */}
            <div className="text-center">
              <div 
                style={{ 
                  fontSize: '14px', 
                  color: '#A3A3A3',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                For LPs
              </div>
              
              <div 
                style={{ 
                  background: '#1E1E1E',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px',
                  padding: '24px'
                }}
              >
                <div 
                  style={{ 
                    fontSize: '56px', 
                    fontWeight: '400',
                    letterSpacing: '-2px',
                    color: '#06B6D4',
                    marginBottom: '12px'
                  }}
                >
                  {animatedAPY}%
                </div>
                <div 
                  style={{ 
                    fontSize: '15px',
                    color: '#FFFFFF',
                    marginBottom: '8px'
                  }}
                >
                  Fixed APY returns
                </div>
                <div 
                  style={{ 
                    fontSize: '13px',
                    color: '#A3A3A3'
                  }}
                >
                  Protected by auto-liquidation
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}