"use client";

import { useState } from 'react';
import { formatUSDC } from '@/utils/formatters';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  maxValue?: bigint;
  maxLabel?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const AmountInput = ({
  value,
  onChange,
  placeholder = "0.00",
  label = "Amount (USDC)",
  maxValue,
  maxLabel = "Max",
  disabled = false,
  error,
  className = '',
}: AmountInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string
    if (inputValue === '') {
      onChange('');
      return;
    }
    
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(inputValue)) {
      return;
    }
    
    // Limit decimal places to 6 (USDC decimals)
    const parts = inputValue.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 6) return;
    
    onChange(inputValue);
  };

  const handleMaxClick = () => {
    if (maxValue && !disabled) {
      const maxFormatted = formatUSDC(maxValue);
      onChange(maxFormatted);
    }
  };

  const inputClasses = `
    w-full bg-dark-gray border rounded-lg px-4 py-3 text-white placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    ${error ? 'border-red-500' : isFocused ? 'border-teal-400' : 'border-gray-600'}
    ${className}
  `;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        {maxValue && (
          <button
            type="button"
            onClick={handleMaxClick}
            disabled={disabled}
            className="text-sm text-teal-400 hover:text-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {maxLabel}: {formatUSDC(maxValue)} USDC
          </button>
        )}
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={inputClasses}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <span className="text-sm text-gray-400">USDC</span>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};
