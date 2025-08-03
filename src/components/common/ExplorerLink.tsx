"use client";

import { getTransactionUrl, getAddressUrl } from '@/config/explorer';
import { SUPPORTED_CHAINS } from '@/config/contracts';

interface ExplorerLinkProps {
  hash?: string;
  address?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const ExplorerLink = ({
  hash,
  address,
  children,
  className = '',
  showIcon = true,
}: ExplorerLinkProps) => {
  const url = hash 
    ? getTransactionUrl(hash, SUPPORTED_CHAINS.LISK_SEPOLIA)
    : address 
    ? getAddressUrl(address, SUPPORTED_CHAINS.LISK_SEPOLIA)
    : '';

  if (!url) return null;

  const defaultText = hash ? 'View Transaction' : address ? 'View Address' : '';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium ${className}`}
    >
      {children || defaultText}
      {showIcon && (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  );
};
