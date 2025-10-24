import { useChainId } from 'wagmi';
import { CONTRACT_CONFIGS, SUPPORTED_CHAINS } from '@/config/contracts';

/**
 * Hook to get contract configurations for Base Sepolia
 * Now uses CONTRACT_CONFIGS from contracts.ts to avoid duplication
 */
export function useChainAwareContracts() {
  return CONTRACT_CONFIGS;
}

/**
 * Hook to check if the current chain is supported (only Base Sepolia)
 */
export function useIsSupportedChain() {
  const chainId = useChainId();
  return chainId === SUPPORTED_CHAINS.BASE_SEPOLIA;
}

/**
 * Hook to get the current chain name
 */
export function useChainName() {
  const chainId = useChainId();
  
  if (chainId === SUPPORTED_CHAINS.BASE_SEPOLIA) {
    return 'Base Sepolia';
  }
  
  return 'Unsupported Chain';
}

/**
 * Hook to check if current chain is Base Sepolia (always true for supported chains)
 */
export function useIsBaseSepolia() {
  const chainId = useChainId();
  return chainId === SUPPORTED_CHAINS.BASE_SEPOLIA;
}
