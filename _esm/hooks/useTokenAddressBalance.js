import { useMemo } from 'react';
import { useTokenBalances } from './useTokenBalances.js';
export const useTokenAddressBalance = (chainId, tokenAddress) => {
    const { tokens, tokensWithBalance, chain, isBalanceLoading, refetch } = useTokenBalances(chainId);
    const token = useMemo(() => {
        if (tokenAddress && chainId) {
            const token = (tokensWithBalance ?? tokens)?.find((token) => token.address === tokenAddress && token.chainId === chainId);
            return token;
        }
    }, [chainId, tokenAddress, tokens, tokensWithBalance]);
    return {
        token,
        chain,
        isLoading: isBalanceLoading,
        refetch,
    };
};
//# sourceMappingURL=useTokenAddressBalance.js.map