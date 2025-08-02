import { MOCK_USDC_ABI, MOCK_USDC_ADDRESS } from '@/abis/mock-usdc-abi';
import { LENDING_POOL_ABI, LENDING_POOL_ADDRESS } from '@/abis/lending-pool-abi';
import { COLLATERAL_MANAGER_ABI, COLLATERAL_MANAGER_ADDRESS } from '@/abis/collateral-manager-abi';
import { LOAN_MANAGER_ABI, LOAN_MANAGER_ADDRESS } from '@/abis/loan-manager-abi';
import { RESTRICTED_WALLET_FACTORY_ABI, RESTRICTED_WALLET_FACTORY_ADDRESS } from '@/abis/restricted-wallet-factory-abi';

// Contract Addresses
export const CONTRACT_ADDRESSES = {
  MOCK_USDC: MOCK_USDC_ADDRESS,
  LENDING_POOL: LENDING_POOL_ADDRESS,
  COLLATERAL_MANAGER: COLLATERAL_MANAGER_ADDRESS,
  LOAN_MANAGER: LOAN_MANAGER_ADDRESS,
  RESTRICTED_WALLET_FACTORY: RESTRICTED_WALLET_FACTORY_ADDRESS,
} as const;

// Contract Configs for wagmi hooks
export const CONTRACT_CONFIGS = {
  MOCK_USDC: {
    address: CONTRACT_ADDRESSES.MOCK_USDC as `0x${string}`,
    abi: MOCK_USDC_ABI,
  },
  LENDING_POOL: {
    address: CONTRACT_ADDRESSES.LENDING_POOL as `0x${string}`,
    abi: LENDING_POOL_ABI,
  },
  COLLATERAL_MANAGER: {
    address: CONTRACT_ADDRESSES.COLLATERAL_MANAGER as `0x${string}`,
    abi: COLLATERAL_MANAGER_ABI,
  },
  LOAN_MANAGER: {
    address: CONTRACT_ADDRESSES.LOAN_MANAGER as `0x${string}`,
    abi: LOAN_MANAGER_ABI,
  },
  RESTRICTED_WALLET_FACTORY: {
    address: CONTRACT_ADDRESSES.RESTRICTED_WALLET_FACTORY as `0x${string}`,
    abi: RESTRICTED_WALLET_FACTORY_ABI,
  },
} as const; 