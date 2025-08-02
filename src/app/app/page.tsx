"use client";

import { useAccount } from 'wagmi';
import { Layout } from '@/components/layout/Layout';
import { redirect } from 'next/navigation';

export default function AppPage() {
  const { isConnected } = useAccount();

  // Redirect to home if not connected
  if (!isConnected) {
    redirect('/');
  }

  return <Layout />;
} 