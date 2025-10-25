'use client';

import { Building2, BarChart3, Target } from 'lucide-react';
import { useAnimation } from '@/hooks';

export default function UseCasesSection() {
  const { ref, isVisible } = useAnimation({
    preset: 'fadeIn',
    threshold: 0.1
  });

  const useCases = [
    {
      icon: Building2,
      tag: 'INSTITUTIONS',
      title: 'Treasury Capital Revolution',
      description: 'DAOs with $20M+ treasuries earning 3% APY in Aave. Deploy $10M via Invalend with $2M collateral. 5x leverage. Chain-enforced execution. Zero trust required.',
      metrics: [
        { label: 'ROI ACHIEVED', value: '21.5%' },
        { label: 'EXECUTION TIME', value: '6 months' },
        { label: 'CAPITAL DEPLOYED', value: '$10M' },
        { label: 'COLLATERAL REQUIRED', value: '$2M' }
      ],
      highlight: 'REVOLUTIONARY'
    },
    {
      icon: BarChart3,
      tag: 'PROFESSIONALS',
      title: 'Market Making at Scale',
      description: 'Independent market maker with $1M capital. Limited by traditional leverage. Access $5M total through Invalend. 5x leverage. Self-custody maintained. Transparent execution.',
      metrics: [
        { label: 'RETURN GENERATED', value: '29.5%' },
        { label: 'EXECUTION TIME', value: '3 months' },
        { label: 'TOTAL ACCESS', value: '$5M' },
        { label: 'CUSTODY STATUS', value: 'MAINTAINED' }
      ],
      highlight: 'SCALABLE'
    },
    {
      icon: Target,
      tag: 'COMMUNITY',
      title: 'Passive Yield Maximization',
      description: 'DeFi investor with $200K USDC earning 3% in Aave. Deposit to Invalend vault. Earn 6% APY. Principal protected by auto-liquidation. 2x better than Aave.',
      metrics: [
        { label: 'YIELD IMPROVEMENT', value: '50%' },
        { label: 'APY EARNED', value: '6%' },
        { label: 'PRINCIPAL STATUS', value: 'PROTECTED' },
        { label: 'VS AAVE', value: '2X BETTER' }
      ],
      highlight: 'MAXIMIZED'
    }
  ];

  return (
    <section 
      id="use-cases"
      ref={ref}
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
            Real-world impact.
            <br />
            <span style={{ color: '#06B6D4' }}>Measurable results.</span>
          </h2>

        </div>

        {/* Use Cases Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            
            return (
              <div 
                key={useCase.title}
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
                <div className="flex items-center justify-between mb-8">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ 
                      background: 'rgba(6, 182, 212, 0.1)',
                      border: '1px solid rgba(6, 182, 212, 0.15)'
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: '#06B6D4' }} strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span 
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
                      {useCase.tag}
                    </span>
                    <span 
                      style={{ 
                        fontSize: '12px',
                        color: '#06B6D4',
                        fontWeight: '400',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {useCase.highlight}
                    </span>
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
                    marginBottom: '16px'
                  }}
                >
                  {useCase.title}
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
                  {useCase.description}
                </p>

                {/* Metrics - Enhanced */}
                <div className="grid grid-cols-2 gap-4 pt-6" style={{ borderTop: '1px solid rgba(6, 182, 212, 0.1)' }}>
                  {useCase.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex flex-col gap-2">
                      <span 
                        style={{ 
                          fontSize: '10px',
                          color: '#A3A3A3',
                          fontWeight: '400',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {metric.label}
                      </span>
                      <span 
                        style={{ 
                          fontSize: '20px',
                          fontWeight: '400',
                          letterSpacing: '-1px',
                          color: '#06B6D4'
                        }}
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
