import { MOCK_USDC_ABI, MOCK_USDC_ADDRESS } from '@/abis/mock-usdc-abi';
import { LENDING_POOL_ABI, LENDING_POOL_ADDRESS } from '@/abis/lending-pool-abi';
import { COLLATERAL_MANAGER_ABI, COLLATERAL_MANAGER_ADDRESS } from '@/abis/collateral-manager-abi';
import { LOAN_MANAGER_ABI, LOAN_MANAGER_ADDRESS } from '@/abis/loan-manager-abi';
import { RESTRICTED_WALLET_FACTORY_ABI, RESTRICTED_WALLET_FACTORY_ADDRESS } from '@/abis/restricted-wallet-factory-abi';
import { RESTRICTED_WALLET_ABI } from '@/abis/restricted-wallet-abi';

// Chain IDs - Only Lisk Sepolia supported
export const SUPPORTED_CHAINS = {
  LISK_SEPOLIA: 4202,
} as const;

// Default chain is Lisk Sepolia
export const DEFAULT_CHAIN_ID = SUPPORTED_CHAINS.LISK_SEPOLIA;

// Contract Addresses for Lisk Sepolia (imported from ABI files)
export const CONTRACT_ADDRESSES = {
  MOCK_USDC: MOCK_USDC_ADDRESS,
  LENDING_POOL: LENDING_POOL_ADDRESS,
  COLLATERAL_MANAGER: COLLATERAL_MANAGER_ADDRESS,
  LOAN_MANAGER: LOAN_MANAGER_ADDRESS,
  RESTRICTED_WALLET_FACTORY: RESTRICTED_WALLET_FACTORY_ADDRESS,
} as const;

// Get contract addresses (always returns Lisk Sepolia addresses)
export function getContractAddresses() {
  return CONTRACT_ADDRESSES;
}

// Contract Configs for wagmi hooks (using addresses and ABIs from ABI files)
export const CONTRACT_CONFIGS = {
  MOCK_USDC: {
    address: MOCK_USDC_ADDRESS as `0x${string}`,
    abi: MOCK_USDC_ABI,
  },
  LENDING_POOL: {
    address: LENDING_POOL_ADDRESS as `0x${string}`,
    abi: LENDING_POOL_ABI,
  },
  COLLATERAL_MANAGER: {
    address: COLLATERAL_MANAGER_ADDRESS as `0x${string}`,
    abi: COLLATERAL_MANAGER_ABI,
  },
  LOAN_MANAGER: {
    address: LOAN_MANAGER_ADDRESS as `0x${string}`,
    abi: LOAN_MANAGER_ABI,
  },
  RESTRICTED_WALLET_FACTORY: {
    address: RESTRICTED_WALLET_FACTORY_ADDRESS as `0x${string}`,
    abi: RESTRICTED_WALLET_FACTORY_ABI,
  },
  RESTRICTED_WALLET: {
    abi: RESTRICTED_WALLET_ABI,
  },
} as const; 