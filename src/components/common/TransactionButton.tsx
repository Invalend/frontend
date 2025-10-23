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

  const baseClasses = 'inline-flex items-center justify-center font-normal rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06B6D4] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#06B6D4] text-[#0A0A0A] hover:bg-[#06B6D4]/90 focus:ring-[#06B6D4]',
    secondary: 'bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/80 focus:ring-[#06B6D4] border border-[rgba(6,182,212,0.15)]',
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
      style={{ fontFamily: 'Space Grotesk' }}
    >
      {isButtonLoading && (
        <LoadingSpinner size="sm" className="mr-2" />
      )}
      {children}
    </button>
  );
}; 