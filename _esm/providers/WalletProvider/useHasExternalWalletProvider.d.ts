import { ChainType } from '@lifi/sdk';
interface ExternalWalletProvider {
    hasExternalProvider: boolean;
    providers: ChainType[];
}
export declare function useHasExternalWalletProvider(): ExternalWalletProvider;
export {};
