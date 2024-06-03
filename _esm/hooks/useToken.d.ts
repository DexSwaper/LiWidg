export declare const useToken: (chainId?: number, tokenAddress?: string) => {
    token: import("@lifi/types").Token | undefined;
    isLoading: boolean;
};
