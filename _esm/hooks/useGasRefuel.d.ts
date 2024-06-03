export declare const useGasRefuel: () => {
    enabled: boolean;
    availble: boolean | undefined;
    isLoading: boolean;
    chain: import("@lifi/types").ExtendedChain | undefined;
    fromAmount: string | undefined;
};
