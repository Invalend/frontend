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
   NEXT_PUBLIC_MOCK_USDC_ADDRESS=0xE7DC2515ECA4DaD2e14971561B412A9B77a4AEE3
   NEXT_PUBLIC_LENDING_POOL_ADDRESS=0x29E750a5BDDa970ADC8f87F2B4057308D2980589
   NEXT_PUBLIC_COLLATERAL_MANAGER_ADDRESS=0xdde884434D414e434a84985E2824bb8E5d00b04C
   NEXT_PUBLIC_LOAN_MANAGER_ADDRESS=0x442905EFB3addd98272dC628fa3c77135A7d3858
   NEXT_PUBLIC_RESTRICTED_WALLET_FACTORY_ADDRESS=0xEcc982Db3AD2B6120688b2ffcC8A4b61b08214D9
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

All contract addresses are deployed on **Arbitrum Sepolia** testnet:

- **MockUSDC**: `0xE7DC2515ECA4DaD2e14971561B412A9B77a4AEE3`
- **LendingPool**: `0x29E750a5BDDa970ADC8f87F2B4057308D2980589`
- **CollateralManager**: `0xdde884434D414e434a84985E2824bb8E5d00b04C`
- **LoanManager**: `0x442905EFB3addd98272dC628fa3c77135A7d3858`
- **RestrictedWalletFactory**: `0xEcc982Db3AD2B6120688b2ffcC8A4b61b08214D9`

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
