"use client";

import { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  status?: 'active' | 'inactive' | 'pending' | 'success' | 'error';
  children: ReactNode;
  className?: string;
}

export const StatusCard = ({
  title,
  status,
  children,
  className = '',
}: StatusCardProps) => {
  const getStatusBadge = () => {
    if (!status) return null;

    const statusConfig = {
      active: { color: 'bg-green-400/20 text-green-400 border-green-400/30', text: 'Active' },
      inactive: { color: 'bg-gray-400/20 text-gray-400 border-gray-400/30', text: 'Inactive' },
      pending: { color: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30', text: 'Pending' },
      success: { color: 'bg-green-400/20 text-green-400 border-green-400/30', text: 'Success' },
      error: { color: 'bg-red-400/20 text-red-400 border-red-400/30', text: 'Error' },
    };

    const config = statusConfig[status];

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${config.color.split(' ')[0].replace('/20', '')}`} />
        {config.text}
      </span>
    );
  };

  return (
    <div className={`bg-dark-gray rounded-lg border border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-300">{title}</h4>
        {getStatusBadge()}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}

export const StatusItem = ({ label, value, highlight = false }: StatusItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-teal-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  );
};
