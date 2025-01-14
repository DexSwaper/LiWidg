import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Grow, Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useChain } from '../../hooks/useChain.js';
import { useToken } from '../../hooks/useToken.js';
import { formatTokenAmount, formatTokenPrice } from '../../utils/format.js';
import { AvatarBadgedSkeleton } from '../Avatar/Avatar.js';
import { TokenAvatar } from '../Avatar/TokenAvatar.js';
import { SmallAvatar } from '../SmallAvatar.js';
import { TextFitter } from '../TextFitter/TextFitter.js';
import { TextSecondary, TextSecondaryContainer } from './Token.style.js';
export const Token = ({ token, ...other }) => {
    if (!token.priceUSD || !token.logoURI) {
        return _jsx(TokenFallback, { token: token, ...other });
    }
    return _jsx(TokenBase, { token: token, ...other });
};
export const TokenFallback = ({ token, isLoading, ...other }) => {
    const { token: chainToken, isLoading: isLoadingToken } = useToken(token.chainId, token.address);
    return (_jsx(TokenBase, { token: { ...token, ...chainToken }, isLoading: isLoading || isLoadingToken, ...other }));
};
export const TokenBase = ({ token, step, stepVisible, disableDescription, isLoading, ...other }) => {
    const { t } = useTranslation();
    const { chain } = useChain(token?.chainId);
    if (isLoading) {
        return (_jsx(TokenSkeleton, { token: token, step: step, disableDescription: disableDescription, ...other }));
    }
    const formattedTokenAmount = formatTokenAmount(token.amount, token.decimals);
    const formattedTokenPrice = formatTokenPrice(formattedTokenAmount, token.priceUSD);
    const tokenOnChain = !disableDescription ? (_jsx(TextSecondary, { children: t(`main.tokenOnChain`, {
            tokenSymbol: token.symbol,
            chainName: chain?.name,
        }) })) : null;
    return (_jsxs(Box, { flex: 1, display: "flex", alignItems: "center", ...other, children: [_jsx(TokenAvatar, { token: token, chain: chain, isLoading: isLoading, sx: { marginRight: 2 } }), _jsxs(Box, { flex: 1, children: [_jsx(Box, { mb: 0.5, height: 24, display: "flex", alignItems: "center", children: _jsx(TextFitter, { height: 30, textStyle: {
                                fontWeight: 700,
                            }, children: t('format.number', {
                                value: formattedTokenAmount,
                            }) }) }), _jsxs(TextSecondaryContainer, { component: "span", children: [_jsx(TextSecondary, { children: t(`format.currency`, {
                                    value: formattedTokenPrice,
                                }) }), !disableDescription ? (_jsx(TextSecondary, { px: 0.5, dot: true, children: "\u2022" })) : null, step ? (_jsx(TokenStep, { step: step, stepVisible: stepVisible, disableDescription: disableDescription, children: tokenOnChain })) : (tokenOnChain)] })] })] }));
};
const TokenStep = ({ step, stepVisible, disableDescription, children, }) => {
    return (_jsxs(Box, { flex: 1, position: "relative", overflow: "hidden", height: 16, children: [_jsx(Grow, { in: !stepVisible && !disableDescription, style: {
                    position: 'absolute',
                }, appear: false, timeout: 225, children: _jsx(Box, { display: "flex", alignItems: "center", height: 16, children: children }) }), _jsx(Grow, { in: stepVisible, style: {
                    position: 'absolute',
                }, appear: false, timeout: 225, children: _jsxs(Box, { display: "flex", alignItems: "center", height: 16, children: [_jsx(Box, { mr: 0.75, height: 16, children: _jsx(SmallAvatar, { src: step?.toolDetails.logoURI, alt: step?.toolDetails.name, children: step?.toolDetails.name[0] }) }), _jsx(TextSecondary, { children: step?.toolDetails.name })] }) })] }));
};
export const TokenSkeleton = ({ step, disableDescription, ...other }) => {
    return (_jsx(Box, { flex: 1, ...other, children: _jsxs(Box, { display: "flex", flex: 1, alignItems: "center", children: [_jsx(AvatarBadgedSkeleton, { sx: { marginRight: 2 } }), _jsxs(Box, { flex: 1, children: [_jsx(Skeleton, { width: 112, height: 24, variant: "text" }), _jsxs(TextSecondaryContainer, { component: "span", children: [_jsx(Skeleton, { width: 48, height: 12, variant: "rounded", sx: { marginTop: 0.5 } }), !step && !disableDescription ? (_jsx(Skeleton, { width: 96, height: 12, variant: "rounded", sx: { marginTop: 0.5, marginLeft: 1.5 } })) : null] })] })] }) }));
};
//# sourceMappingURL=Token.js.map