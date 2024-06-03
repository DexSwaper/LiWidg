import { Box, Typography, alpha, styled } from '@mui/material';
export const TextSecondaryContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
}));
export const TextSecondary = styled(Typography, {
    shouldForwardProp: (prop) => !['dot'].includes(prop),
})(({ theme, dot }) => ({
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 500,
    color: dot
        ? alpha(theme.palette.text.secondary, 0.56)
        : theme.palette.text.secondary,
}));
export const TokenDivider = styled(Box)(({ theme }) => ({
    height: 16,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
    borderColor: theme.palette.mode === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[800],
}));
//# sourceMappingURL=Token.style.js.map