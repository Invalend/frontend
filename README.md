# Invalend Frontend

Frontend application for Invalend Protocol - a leverage DeFi protocol based on EigenLayer with 20/80 prefunding model.

## Features

- **Wallet Connection** - Connect with RainbowKit
- **Pool Management** - Deposit and withdraw USDC with 6% APY
- **Loan Creation** - Create leverage loans with 20% margin
- **Dashboard** - Monitor deposits, loans, and yields
- **Responsive Design** - Mobile-first approach

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **RainbowKit** - Wallet connection
- **Wagmi** - Ethereum hooks
- **Viem** - Ethereum client

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local` file with contract addresses:
   ```env
   NEXT_PUBLIC_MOCK_USDC_ADDRESS=0xe61995e2728bd2d2b1abd9e089213b542db7916a
   NEXT_PUBLIC_LENDING_POOL_ADDRESS=0x752168dd102d1c4b9390ab6abf3ec39f2164ad11
   NEXT_PUBLIC_COLLATERAL_MANAGER_ADDRESS=0x23c369a4991a477e4b9dd13f179b2e68203abc1d
   NEXT_PUBLIC_LOAN_MANAGER_ADDRESS=0x8c0694ff8df07554c5a4b2d83992e1987733ba64
   NEXT_PUBLIC_RESTRICTED_WALLET_FACTORY_ADDRESS=0x7364eeb345989c757616988b70976bba163b7571
   WALLET_CONNECT_PROJECT_ID=invalend
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── provider.tsx       # Wagmi provider
├── components/            # React components
│   ├── common/           # Reusable components
│   │   ├── ConnectWallet.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── TransactionButton.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Layout.tsx
├── config/               # Configuration
│   └── contracts.ts      # Contract addresses & configs
├── utils/                # Utility functions
│   └── formatters.ts     # Number & address formatting
└── abis/                 # Contract ABIs
    ├── mock-usdc-abi.ts
    ├── lending-pool-abi.ts
    ├── collateral-manager-abi.ts
    ├── loan-manager-abi.ts
    └── restricted-wallet-factory-abi.ts
```

## Contract Addresses

All contract addresses are deployed on **Base Sepolia** testnet:

- **MockUSDC**: `0xe61995e2728bd2d2b1abd9e089213b542db7916a`
- **LendingPool**: `0x752168dd102d1c4b9390ab6abf3ec39f2164ad11`
- **CollateralManager**: `0x23c369a4991a477e4b9dd13f179b2e68203abc1d`
- **LoanManager**: `0x8c0694ff8df07554c5a4b2d83992e1987733ba64`
- **RestrictedWalletFactory**: `0x7364eeb345989c757616988b70976bba163b7571`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Protocol Overview

Invalend uses a unique **prefunding model**:

- **20% user margin contribution** (USDC)
- **80% protocol pool funding**
- **5x leverage ratio** for capital-efficient trading
- **Non-custodial restricted wallet** for Uniswap V3
- **Auto-liquidation** after 30 days

## Development Status

This is a **Proof of Concept (PoC)** version with minimal features:

✅ **Phase 1**: Wallet Connection & Basic UI  
🔄 **Phase 2**: Pool Features (Deposit/Withdraw)  
⏳ **Phase 3**: Loan Features (Create/Repay)  
⏳ **Phase 4**: Dashboard & Analytics  
⏳ **Phase 5**: Testing & Polish
