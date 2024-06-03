import type { FormType } from '../stores/form/types.js';
export declare const useChains: (type?: FormType) => {
    chains: import("@lifi/types").ExtendedChain[] | undefined;
    getChainById: (chainId?: number | undefined, chains?: import("@lifi/types").ExtendedChain[] | undefined) => import("@lifi/types").ExtendedChain | undefined;
    isLoading: boolean;
};
