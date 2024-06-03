import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useRef } from 'react';
import { useAccount } from '../../hooks/useAccount.js';
import { useChain } from '../../hooks/useChain.js';
import { useDebouncedWatch } from '../../hooks/useDebouncedWatch.js';
import { useTokenBalances } from '../../hooks/useTokenBalances.js';
import { useTokenSearch } from '../../hooks/useTokenSearch.js';
import { FormKeyHelper } from '../../stores/form/types.js';
import { useFieldValues } from '../../stores/form/useFieldValues.js';
import { TokenNotFound } from './TokenNotFound.js';
import { VirtualizedTokenList } from './VirtualizedTokenList.js';
import { useTokenSelect } from './useTokenSelect.js';
import { filteredTokensComparator } from './utils.js';
export const TokenList = ({ formType, height, onClick, }) => {
    const parentRef = useRef(null);
    const [selectedChainId] = useFieldValues(FormKeyHelper.getChainKey(formType));
    const [tokenSearchFilter] = useDebouncedWatch(320, 'tokenSearchFilter');
    const { chain, isLoading: isChainLoading } = useChain(selectedChainId);
    const { account } = useAccount({ chainType: chain?.chainType });
    const { tokens: chainTokens, tokensWithBalance, isLoading: isTokensLoading, isBalanceLoading, featuredTokens, popularTokens, } = useTokenBalances(selectedChainId);
    let filteredTokens = (tokensWithBalance ??
        chainTokens ??
        []);
    const normalizedSearchFilter = tokenSearchFilter?.replaceAll('$', '');
    const searchFilter = normalizedSearchFilter?.toUpperCase() ?? '';
    filteredTokens = tokenSearchFilter
        ? filteredTokens
            .filter((token) => token.name?.toUpperCase().includes(searchFilter) ||
            token.symbol.toUpperCase().includes(searchFilter) ||
            token.address.toUpperCase().includes(searchFilter))
            .sort(filteredTokensComparator(searchFilter))
        : filteredTokens;
    const tokenSearchEnabled = !isTokensLoading &&
        !filteredTokens.length &&
        !!tokenSearchFilter &&
        !!selectedChainId;
    const { token: searchedToken, isLoading: isSearchedTokenLoading } = useTokenSearch(selectedChainId, normalizedSearchFilter, tokenSearchEnabled);
    const isLoading = isTokensLoading ||
        isChainLoading ||
        (tokenSearchEnabled && isSearchedTokenLoading);
    const tokens = filteredTokens.length
        ? filteredTokens
        : searchedToken
            ? [searchedToken]
            : filteredTokens;
    const handleTokenClick = useTokenSelect(formType, onClick);
    const showCategories = Boolean(featuredTokens?.length || popularTokens?.length) &&
        !tokenSearchFilter;
    return (_jsxs(Box, { ref: parentRef, style: { height, overflow: 'auto' }, children: [!tokens.length && !isLoading ? (_jsx(TokenNotFound, { formType: formType })) : null, _jsx(VirtualizedTokenList, { account: account, tokens: tokens, scrollElementRef: parentRef, chainId: selectedChainId, chain: chain, isLoading: isLoading, isBalanceLoading: isBalanceLoading, showCategories: showCategories, onClick: handleTokenClick })] }));
};
//# sourceMappingURL=TokenList.js.map