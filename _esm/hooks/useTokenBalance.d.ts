import type { ExtendedChain } from '@lifi/sdk';
import { type Token, type TokenAmount } from '@lifi/sdk';
export declare const useTokenBalance: (accountAddress?: string, token?: Token, chain?: ExtendedChain) => {
    token: TokenAmount | undefined;
    isLoading: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<TokenAmount, Error>>;
    refetchNewBalance: () => void;
    refetchAllBalances: () => void;
    getTokenBalancesWithRetry: (accountAddress: string, tokens: Token[], depth?: number) => Promise<TokenAmount[] | undefined>;
};
export declare const getTokenBalancesWithRetry: (accountAddress: string, tokens: Token[], depth?: number) => Promise<TokenAmount[] | undefined>;
