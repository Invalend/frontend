"use client";

import { useState, useEffect } from 'react';
import { ExplorerLink } from './ExplorerLink';

interface TransactionNotificationProps {
  hash?: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
  autoHide?: boolean;
  hideAfter?: number;
  onClose?: () => void;
}

export const TransactionNotification = ({
  hash,
  status,
  message,
  autoHide = true,
  hideAfter = 5000,
  onClose,
}: TransactionNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide && status !== 'pending' && hideAfter > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, hideAfter);
      return () => clearTimeout(timer);
    }
  }, [autoHide, status, hideAfter, onClose]);

  if (!isVisible) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return (
          <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full" />
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'border-blue-400/30 bg-blue-400/10';
      case 'success':
        return 'border-green-400/30 bg-green-400/10';
      case 'error':
        return 'border-red-400/30 bg-red-400/10';
    }
  };

  const getDefaultMessage = () => {
    switch (status) {
      case 'pending':
        return 'Transaction pending...';
      case 'success':
        return 'Transaction successful!';
      case 'error':
        return 'Transaction failed';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getStatusColor()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getStatusIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">
            {message || getDefaultMessage()}
          </p>
          {hash && (
            <div className="mt-2">
              <ExplorerLink hash={hash}>
                View on Explorer
              </ExplorerLink>
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
