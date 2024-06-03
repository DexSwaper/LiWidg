import type { Wallet } from '@solana/wallet-adapter-react';
import type { Connector } from 'wagmi';
export declare const walletComparator: (a: Connector | Wallet, b: Connector | Wallet) => number;
