import { useMemo } from 'react';
import { useTokenSearch } from './useTokenSearch.js';
import { useTokens } from './useTokens.js';
export const useToken = (chainId, tokenAddress) => {
    const { tokens, isLoading } = useTokens(chainId);
    const token = useMemo(() => {
        const token = tokens?.find((token) => token.address === tokenAddress && token.chainId === chainId);
        return token;
    }, [chainId, tokenAddress, tokens]);
    const tokenSearchEnabled = !isLoading && !token;
    const { token: searchedToken, isLoading: isSearchedTokenLoading } = useTokenSearch(chainId, tokenAddress, tokenSearchEnabled);
    return {
        token: token ?? searchedToken,
        isLoading: isLoading || (tokenSearchEnabled && isSearchedTokenLoading),
    };
};
//# sourceMappingURL=useToken.js.map