"use client";

import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface TransactionButtonProps {
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TransactionButton = ({
  onClick,
  disabled = false,
  loading = false,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: TransactionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading || loading) return;
    
    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error('Transaction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-teal-400 text-black hover:bg-teal-500 focus:ring-teal-400',
    secondary: 'bg-dark-gray text-white hover:bg-gray-700 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const isButtonLoading = isLoading || loading;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isButtonLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isButtonLoading && (
        <LoadingSpinner size="sm" className="mr-2" />
      )}
      {children}
    </button>
  );
}; 