import { AppBar, Avatar, Box, Button, buttonClasses, styled, } from '@mui/material';
import { getContrastAlphaColor } from '../../utils/colors.js';
import { avatarMask12 } from '../Avatar/utils.js';
export const HeaderAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
}));
export const Container = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'sticky',
})(({ theme, sticky }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    backdropFilter: 'blur(12px)',
    position: sticky ? 'sticky' : 'relative',
    top: 0,
    zIndex: 1200,
    gap: theme.spacing(0.5),
    padding: theme.spacing(1.5, 3, 1.5, 3),
}));
export const WalletButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'subvariant',
})(({ subvariant, theme }) => ({
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    padding: theme.spacing(1, 1.5),
    maxHeight: 40,
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 2,
    '&:hover': {
        backgroundColor: getContrastAlphaColor(theme, 0.04),
    },
    [`.${buttonClasses.endIcon} > *:nth-of-type(1)`]: {
        fontSize: '24px',
    },
    [`.${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
        fontSize: '24px',
    },
    ...(theme.navigation.edge && {
        marginRight: subvariant === 'split' ? 0 : theme.spacing(-1.25),
        marginLeft: subvariant === 'split' ? theme.spacing(-1) : 0,
    }),
}));
export const DrawerWalletContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    ...(theme.navigation.edge && {
        '& button:first-of-type': {
            marginLeft: theme.spacing(-1),
        },
        '& button:last-of-type': {
            marginRight: theme.spacing(-1.25),
        },
    }),
}));
export const HeaderControlsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(0.5),
    ...(theme.navigation.edge && {
        '& button:last-of-type': {
            marginRight: theme.spacing(-1.25),
        },
    }),
}));
export const WalletAvatar = styled(Avatar)(({ theme }) => ({
    mask: avatarMask12,
    width: 24,
    height: 24,
}));
//# sourceMappingURL=Header.style.js.map