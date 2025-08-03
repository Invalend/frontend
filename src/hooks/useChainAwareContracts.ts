import { useChainId } from 'wagmi';
import { getContractAddresses, SUPPORTED_CHAINS } from '@/config/contracts';
import { MOCK_USDC_ABI } from '@/abis/mock-usdc-abi';
import { LENDING_POOL_ABI } from '@/abis/lending-pool-abi';
import { COLLATERAL_MANAGER_ABI } from '@/abis/collateral-manager-abi';
import { LOAN_MANAGER_ABI } from '@/abis/loan-manager-abi';
import { RESTRICTED_WALLET_FACTORY_ABI } from '@/abis/restricted-wallet-factory-abi';

/**
 * Hook to get contract configurations for Lisk Sepolia
 */
export function useChainAwareContracts() {
  const addresses = getContractAddresses();

  return {
    MOCK_USDC: {
      address: addresses.MOCK_USDC as `0x${string}`,
      abi: MOCK_USDC_ABI,
    },
    LENDING_POOL: {
      address: addresses.LENDING_POOL as `0x${string}`,
      abi: LENDING_POOL_ABI,
    },
    COLLATERAL_MANAGER: {
      address: addresses.COLLATERAL_MANAGER as `0x${string}`,
      abi: COLLATERAL_MANAGER_ABI,
    },
    LOAN_MANAGER: {
      address: addresses.LOAN_MANAGER as `0x${string}`,
      abi: LOAN_MANAGER_ABI,
    },
    RESTRICTED_WALLET_FACTORY: {
      address: addresses.RESTRICTED_WALLET_FACTORY as `0x${string}`,
      abi: RESTRICTED_WALLET_FACTORY_ABI,
    },
  };
}

/**
 * Hook to check if the current chain is supported (only Lisk Sepolia)
 */
export function useIsSupportedChain() {
  const chainId = useChainId();
  return chainId === SUPPORTED_CHAINS.LISK_SEPOLIA;
}

/**
 * Hook to get the current chain name
 */
export function useChainName() {
  const chainId = useChainId();
  
  if (chainId === SUPPORTED_CHAINS.LISK_SEPOLIA) {
    return 'Lisk Sepolia';
  }
  
  return 'Unsupported Chain';
}

/**
 * Hook to check if current chain is Lisk Sepolia (always true for supported chains)
 */
export function useIsLiskSepolia() {
  const chainId = useChainId();
  return chainId === SUPPORTED_CHAINS.LISK_SEPOLIA;
}
