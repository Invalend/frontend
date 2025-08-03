import { parseUSDC } from './formatters';

// Validation errors
export const VALIDATION_ERRORS = {
  INVALID_AMOUNT: 'Please enter a valid amount',
  AMOUNT_TOO_LOW: 'Amount must be greater than 0',
  AMOUNT_TOO_HIGH: 'Amount exceeds available balance',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INSUFFICIENT_ALLOWANCE: 'Please approve token spending first',
  NO_WALLET_CONNECTED: 'Please connect your wallet',
  INVALID_ADDRESS: 'Invalid wallet address',
} as const;

// Validate loan amount
export const validateLoanAmount = (
  amount: string,
  balance?: bigint,
  minAmount?: bigint
): string | null => {
  if (!amount || amount === '0') {
    return VALIDATION_ERRORS.AMOUNT_TOO_LOW;
  }

  try {
    const parsedAmount = parseUSDC(amount);
    
    if (parsedAmount <= BigInt(0)) {
      return VALIDATION_ERRORS.AMOUNT_TOO_LOW;
    }

    if (minAmount && parsedAmount < minAmount) {
      return `Minimum amount is ${minAmount} USDC`;
    }

    if (balance && parsedAmount > balance) {
      return VALIDATION_ERRORS.INSUFFICIENT_BALANCE;
    }

    return null;
  } catch {
    return VALIDATION_ERRORS.INVALID_AMOUNT;
  }
};

// Validate wallet address
export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Check if allowance is sufficient
export const isAllowanceSufficient = (
  amount: string,
  allowance?: bigint
): boolean => {
  try {
    const parsedAmount = parseUSDC(amount);
    return allowance ? parsedAmount <= allowance : false;
  } catch {
    return false;
  }
};

// Get transaction error message
export const getTransactionErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Check for common error patterns
    if (error.message.includes('user rejected')) {
      return 'Transaction was rejected by user';
    }
    if (error.message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction';
    }
    if (error.message.includes('gas')) {
      return 'Transaction failed due to gas issues';
    }
    if (error.message.includes('revert')) {
      return 'Transaction reverted by smart contract';
    }
    return error.message;
  }
  return 'Unknown error occurred';
};
