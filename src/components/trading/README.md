# Trading Component

This directory contains the trading functionality for the Invalend DeFi protocol, implementing integration with Uniswap V3 for leveraged trading through restricted wallets.

## Overview

The trading system allows users to:
- Create leveraged positions (up to 5x) using USDC as collateral
- Trade various tokens including LSK (Lisk), ETH, WBTC, and UNI
- Execute swaps through their restricted wallets with enhanced security
- Monitor positions and manage slippage tolerance

## Files Structure

```
trading/
├── TradingPage.tsx      # Main trading interface component
├── hooks.ts             # Custom hooks for contract interactions
├── constants.ts         # Token configurations and trading constants
├── index.ts            # Export file
└── README.md           # This file
```

## Components

### TradingPage
The main trading interface that provides:
- Token selection interface with LSK support
- Trade amount input with real-time validation
- Slippage tolerance configuration
- Loan creation and swap execution
- Real-time balance and position monitoring

### useTradingHooks
Custom hook that manages:
- Wallet connection state
- Contract interactions (loan creation, token swaps)
- Transaction status tracking
- Balance queries for both user wallet and restricted wallet

## Key Features

### Supported Tokens
- **ETH**: Native Ethereum (18 decimals)
- **USDC**: USD Coin - Primary collateral (6 decimals)  
- **WBTC**: Wrapped Bitcoin (8 decimals)
- **LSK**: Lisk token (18 decimals) - *Newly added*
- **UNI**: Uniswap token (18 decimals)

### Trading Flow
1. **Connect Wallet**: User connects their wallet to the dApp
2. **Approve USDC**: Approve USDC spending for margin requirements (20% of position size)
3. **Create Loan**: Create a leveraged loan through LoanManager contract
4. **Execute Swap**: Use restricted wallet to swap tokens via Uniswap V3
5. **Monitor Position**: Track gains/losses and manage position

### Security Features
- **Restricted Wallet**: All trades executed through secure restricted wallet
- **Whitelisted Tokens**: Only pre-approved tokens can be traded
- **Function Selectors**: Only approved Uniswap functions can be called
- **Slippage Protection**: Configurable slippage tolerance (0.1% to 50%)

## Configuration

### Token Addresses (Lisk Sepolia)
- USDC: `0xe61995e2728bd2d2b1abd9e089213b542db7916a` (actual deployed)
- LSK: `0xac485391EB2d7D88253a7F1eF18C37f4242D1A24` (example - replace with actual)
- Other tokens: Placeholder addresses (update with actual deployments)

### Uniswap V3 Integration
- Router: `0xE592427A0AEce92De3Edee1F18E0157C05861564` (example)
- Fee Tiers: 0.05%, 0.3%, 1.0%
- Default Deadline: 20 minutes

## Usage Example

```tsx
import { TradingPage } from '@/components/trading';

export function App() {
  return (
    <div>
      <TradingPage />
    </div>
  );
}
```

## Smart Contract Integration

### RestrictedWallet Functions Used
- `swapExactInputSingle`: Swap exact input amount for minimum output
- `swapExactOutputSingle`: Swap for exact output using maximum input
- `addWhitelistedToken`: Add tokens to trading whitelist
- `addApprovedTarget`: Add Uniswap router to approved targets

### LoanManager Functions Used
- `createLoan`: Create leveraged position
- `getLoanInfo`: Get user's current loan details
- `canCreateLoan`: Check if user can create new loan

## Error Handling

The component handles various error states:
- Wallet not connected
- Insufficient USDC balance
- Active loan already exists
- Transaction failures
- Network issues

## Future Enhancements

1. **Price Oracles**: Integrate Chainlink price feeds for accurate pricing
2. **Advanced Orders**: Add limit orders and stop-loss functionality
3. **Multi-Hop Swaps**: Support complex trading routes
4. **Position Analytics**: Add PnL tracking and performance metrics
5. **Auto-Slippage**: Dynamic slippage based on market conditions

## Development Notes

This is a PoC (Proof of Concept) implementation focused on demonstrating the core functionality. For production use, consider:
- Real token address deployments on Lisk
- Enhanced error handling and user feedback
- Gas optimization
- Comprehensive testing
- Security audits
