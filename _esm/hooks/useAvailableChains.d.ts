import type { ExtendedChain } from '@lifi/sdk';
export declare const useAvailableChains: () => {
    chains: ExtendedChain[] | undefined;
    getChainById: (chainId?: number, chains?: ExtendedChain[] | undefined) => ExtendedChain | undefined;
    isLoading: boolean;
};
