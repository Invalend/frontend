'use client';

import { TrendingDown, AlertCircle, XCircle } from 'lucide-react';
import { useAnimation, useCounter } from '@/hooks';

export default function ProblemSection() {
  const { ref: problemRef, isVisible } = useAnimation({
    preset: 'fadeIn',
    threshold: 0.1
  });

  const animatedCollateral = useCounter({
    startValue: 0,
    endValue: 150,
    isVisible,
    duration: 'hero',
    easing: 'easeOutQuart'
  });

  const animatedYield = useCounter({
    startValue: 0,
    endValue: 3,
    isVisible,
    duration: 'hero',
    easing: 'easeOutQuart',
    delay: 200
  });

  const animatedLosses = useCounter({
    startValue: 0,
    endValue: 100,
    isVisible,
    duration: 'hero',
    easing: 'easeOutQuart',
    delay: 400
  });

  return (
    <section 
      ref={problemRef}
      id="problem-section"
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
            DeFi leverage is
            <br />
            <span style={{ color: '#06B6D4' }}>fundamentally broken</span>
          </h2>

        </div>

        {/* Problem Cards - Flat Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Problem 1: Over-collateralization */}
          <div 
            style={{ 
              background: '#1E1E1E',
              border: '1px solid rgba(6, 182, 212, 0.15)',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            {/* Icon */}
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
            >
              <TrendingDown className="w-6 h-6" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
            </div>
            
            {/* Title */}
            <h3 
              style={{ 
                fontSize: '24px', 
                fontWeight: '400',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Over-collateralization
              <br />
              kills efficiency
            </h3>
            
            {/* Description */}
            <p 
              style={{ 
                fontSize: '15px', 
                lineHeight: '1.7',
                color: '#A3A3A3',
                fontWeight: '400',
                marginBottom: '24px'
              }}
            >
              Aave and Compound require {animatedCollateral}%+ collateral for basic leverage. 
              Capital locked. Strategies limited. Growth stifled.
            </p>
            
            {/* Stat */}
            <div 
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'inline-block'
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '400', letterSpacing: '-1.5px', color: '#06B6D4' }}>
                {animatedCollateral}%+
              </div>
              <div style={{ fontSize: '12px', color: '#A3A3A3', marginTop: '2px' }}>
                Collateral required
              </div>
            </div>
          </div>

          {/* Problem 2: Low Yields */}
          <div 
            style={{ 
              background: '#1E1E1E',
              border: '1px solid rgba(6, 182, 212, 0.15)',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            {/* Icon */}
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
            >
              <AlertCircle className="w-6 h-6" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
            </div>
            
            {/* Title */}
            <h3 
              style={{ 
                fontSize: '24px', 
                fontWeight: '400',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Billions earning
              <br />
              near-nothing
            </h3>
            
            {/* Description */}
            <p 
              style={{ 
                fontSize: '15px', 
                lineHeight: '1.7',
                color: '#A3A3A3',
                fontWeight: '400',
                marginBottom: '24px'
              }}
            >
              LPs earn {animatedYield}-5% APY while $20B+ sits idle. 
              Opportunity cost massive. Better options needed.
            </p>
            
            {/* Stat */}
            <div 
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'inline-block'
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '400', letterSpacing: '-1.5px', color: '#06B6D4' }}>
                {animatedYield}-5%
              </div>
              <div style={{ fontSize: '12px', color: '#A3A3A3', marginTop: '2px' }}>
                APY on $20B TVL
              </div>
            </div>
          </div>

          {/* Problem 3: Trust Failures */}
          <div 
            style={{ 
              background: '#1E1E1E',
              border: '1px solid rgba(6, 182, 212, 0.15)',
              borderRadius: '8px',
              padding: '32px'
            }}
          >
            {/* Icon */}
            <div 
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}
            >
              <XCircle className="w-6 h-6" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
            </div>
            
            {/* Title */}
            <h3 
              style={{ 
                fontSize: '24px', 
                fontWeight: '400',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
                color: '#FFFFFF',
                marginBottom: '16px'
              }}
            >
              Trust-based models
              <br />
              catastrophically failed
            </h3>
            
            {/* Description */}
            <p 
              style={{ 
                fontSize: '15px', 
                lineHeight: '1.7',
                color: '#A3A3A3',
                fontWeight: '400',
                marginBottom: '24px'
              }}
            >
              Maple Finance promised better. Off-chain execution. 
              Opaque management. ${animatedLosses}M+ in LP losses. Trust broken.
            </p>
            
            {/* Stat */}
            <div 
              style={{ 
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.15)',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'inline-block'
              }}
            >
              <div style={{ fontSize: '32px', fontWeight: '400', letterSpacing: '-1.5px', color: '#06B6D4' }}>
                ${animatedLosses}M+
              </div>
              <div style={{ fontSize: '12px', color: '#A3A3A3', marginTop: '2px' }}>
                Lost in 2022-23
              </div>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
}