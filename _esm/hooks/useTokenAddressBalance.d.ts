import type { TokenAmount } from '../types/token.js';
export declare const useTokenAddressBalance: (chainId?: number, tokenAddress?: string) => {
    token: TokenAmount | undefined;
    chain: import("@lifi/types").ExtendedChain | undefined;
    isLoading: boolean;
    refetch: (options?: import("@tanstack/query-core").RefetchOptions | undefined) => Promise<import("@tanstack/query-core").QueryObserverResult<TokenAmount[], Error>>;
};
