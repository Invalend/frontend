'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-normal text-white mb-4" style={{ 
              fontFamily: 'Space Grotesk',
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}>
              Something went wrong
            </h2>
            
            <p className="text-lg text-[#A3A3A3] mb-6" style={{ 
              fontFamily: 'Space Grotesk',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#06B6D4] text-[#0A0A0A] rounded-lg font-normal transition-colors hover:bg-[#06B6D4]/90"
              style={{ fontFamily: 'Space Grotesk' }}
              aria-label="Retry loading the component"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-[#A3A3A3] cursor-pointer hover:text-white font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-[#1E1E1E] rounded text-xs text-red-400 overflow-auto font-normal" style={{ fontFamily: 'Space Grotesk' }}>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
