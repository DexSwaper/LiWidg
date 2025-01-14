import { getTokenBalances } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';
import { useAccount } from './useAccount.js';
import { useTokens } from './useTokens.js';
const defaultRefetchInterval = 32000;
export const useTokenBalances = (selectedChainId) => {
    const { tokens, featuredTokens, popularTokens, chain, isLoading } = useTokens(selectedChainId);
    const { account } = useAccount({ chainType: chain?.chainType });
    const isBalanceLoadingEnabled = Boolean(account.address) &&
        Boolean(tokens?.length) &&
        Boolean(selectedChainId);
    const { data: tokensWithBalance, isLoading: isBalanceLoading, refetch, } = useQuery({
        queryKey: [
            'token-balances',
            account.address,
            selectedChainId,
            tokens?.length,
        ],
        queryFn: async ({ queryKey: [, accountAddress] }) => {
            const tokensWithBalance = await getTokenBalances(accountAddress, tokens);
            if (!tokensWithBalance?.length) {
                return tokens;
            }
            const sortFn = (a, b) => parseFloat(formatUnits(b.amount ?? 0n, b.decimals)) *
                parseFloat(b.priceUSD ?? '0') -
                parseFloat(formatUnits(a.amount ?? 0n, a.decimals)) *
                    parseFloat(a.priceUSD ?? '0');
            const featuredTokens = [];
            const tokensWithAmount = [];
            const popularTokens = [];
            const allTokens = [];
            tokensWithBalance.forEach((token) => {
                if (token.amount) {
                    token.featured = false;
                    token.popular = false;
                }
                if (token.featured) {
                    featuredTokens.push(token);
                }
                else if (token.amount) {
                    tokensWithAmount.push(token);
                }
                else if (token.popular) {
                    popularTokens.push(token);
                }
                else {
                    allTokens.push(token);
                }
            });
            tokensWithAmount.sort(sortFn);
            const result = [
                ...featuredTokens,
                ...tokensWithAmount,
                ...popularTokens,
                ...allTokens,
            ];
            return result;
        },
        enabled: isBalanceLoadingEnabled,
        refetchInterval: defaultRefetchInterval,
        staleTime: defaultRefetchInterval,
    });
    return {
        tokens,
        tokensWithBalance,
        featuredTokens,
        popularTokens,
        chain,
        isLoading,
        isBalanceLoading: isBalanceLoading && isBalanceLoadingEnabled,
        refetch,
    };
};
//# sourceMappingURL=useTokenBalances.js.map