import { ChainType } from '@lifi/sdk';
import type { WalletAdapter } from '@solana/wallet-adapter-base';
import type { Chain } from 'viem';
import type { Connector } from 'wagmi';
export interface AccountBase {
    address?: string;
    addresses?: readonly string[];
    chain?: Chain;
    chainId?: number;
    chainType?: ChainType;
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnected: boolean;
    isReconnecting: boolean;
    status: 'connected' | 'reconnecting' | 'connecting' | 'disconnected';
}
export interface EVMAccount extends AccountBase {
    chainType: ChainType.EVM;
    connector?: Connector;
}
export interface SVMAccount extends AccountBase {
    chainType: ChainType.SVM;
    connector?: WalletAdapter;
}
export interface DefaultAccount extends AccountBase {
    connector?: never;
}
export type Account = EVMAccount | SVMAccount | DefaultAccount;
export interface AccountResult {
    account: Account;
    /**
     * Connected accounts
     */
    accounts: Account[];
}
interface UseAccountArgs {
    chainType?: ChainType;
}
/**
 *
 * @param args When we provide args we want to return either account with corresponding chainType or default disconnected one
 * @returns - Account result
 */
export declare const useAccount: (args?: UseAccountArgs) => AccountResult;
export {};
