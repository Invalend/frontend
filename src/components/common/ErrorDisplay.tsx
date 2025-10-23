"use client";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="bg-red-400/20 border border-red-400/30 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-normal text-red-400" style={{ fontFamily: 'Space Grotesk' }}>Transaction Failed</h4>
          <p className="text-sm text-red-300 mt-1 font-normal" style={{ fontFamily: 'Space Grotesk' }}>
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-xs text-red-300 hover:text-red-200 underline font-normal"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 