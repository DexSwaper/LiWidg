import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContentCopyRounded, DeleteOutline, MoreHoriz, OpenInNewRounded, TurnedIn, } from '@mui/icons-material';
import { Button, ListItemAvatar, ListItemText, MenuItem } from '@mui/material';
import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AccountAvatar } from '../../components/Avatar/AccountAvatar.js';
import { ListItemButton } from '../../components/ListItem//ListItemButton.js';
import { ListItem } from '../../components/ListItem/ListItem.js';
import { Menu } from '../../components/Menu.js';
import { useChains } from '../../hooks/useChains.js';
import { useHeader } from '../../hooks/useHeader.js';
import { useToAddressRequirements } from '../../hooks/useToAddressRequirements.js';
import { useBookmarkActions } from '../../stores/bookmarks/useBookmarkActions.js';
import { useBookmarks } from '../../stores/bookmarks/useBookmarks.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useSendToWalletActions } from '../../stores/settings/useSendToWalletStore.js';
import { defaultChainIdsByType } from '../../utils/chainType.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { shortenAddress } from '../../utils/wallet.js';
import { BookmarkAddressSheet } from './BookmarkAddressSheet.js';
import { EmptyListIndicator } from './EmptyListIndicator.js';
import { BookmarkButtonContainer, ListContainer, OptionsMenuButton, SendToWalletPageContainer, } from './SendToWalletPage.style.js';
export const BookmarksPage = () => {
    const { t } = useTranslation();
    const [bookmark, setBookmark] = useState();
    const bookmarkAddressSheetRef = useRef(null);
    const { bookmarks } = useBookmarks();
    const { requiredToChainType } = useToAddressRequirements();
    const { addBookmark, removeBookmark, setSelectedBookmark } = useBookmarkActions();
    const { getChainById } = useChains();
    const navigate = useNavigate();
    const { setFieldValue } = useFieldActions();
    const { setSendToWallet } = useSendToWalletActions();
    useHeader(t(`header.bookmarkedWallets`));
    const handleAddBookmark = () => {
        bookmarkAddressSheetRef.current?.open();
    };
    const handleBookmarkSelected = (bookmark) => {
        setFieldValue('toAddress', bookmark.address, {
            isTouched: true,
        });
        setSelectedBookmark(bookmark);
        setSendToWallet(true);
        navigate(navigationRoutes.home);
    };
    const moreMenuId = useId();
    const [moreMenuAnchorEl, setMenuAnchorEl] = useState();
    const open = Boolean(moreMenuAnchorEl);
    const closeMenu = () => {
        setMenuAnchorEl(null);
    };
    const handleMenuOpen = (el, bookmark) => {
        setMenuAnchorEl(el);
        setBookmark(bookmark);
    };
    const handleCopyAddress = () => {
        if (bookmark) {
            navigator.clipboard.writeText(bookmark.address);
        }
        closeMenu();
    };
    const handleViewOnExplorer = () => {
        if (bookmark) {
            const chain = getChainById(defaultChainIdsByType[bookmark.chainType]);
            window.open(`${chain?.metamask.blockExplorerUrls[0]}address/${bookmark.address}`, '_blank');
        }
        closeMenu();
    };
    const handleRemoveBookmark = () => {
        if (bookmark) {
            removeBookmark(bookmark.address);
        }
        closeMenu();
    };
    return (_jsxs(SendToWalletPageContainer, { disableGutters: true, children: [_jsxs(ListContainer, { children: [bookmarks.map((bookmark) => (_jsxs(ListItem, { sx: { position: 'relative' }, children: [_jsxs(ListItemButton, { onClick: () => handleBookmarkSelected(bookmark), disabled: requiredToChainType &&
                                    requiredToChainType !== bookmark.chainType, children: [_jsx(ListItemAvatar, { children: _jsx(AccountAvatar, { chainId: defaultChainIdsByType[bookmark.chainType] }) }), _jsx(ListItemText, { primary: bookmark.name, secondary: shortenAddress(bookmark.address) })] }), _jsx(OptionsMenuButton, { "aria-label": t('button.options'), "aria-controls": open && bookmark.address === bookmark?.address
                                    ? moreMenuId
                                    : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: (e) => handleMenuOpen(e.target, bookmark), sx: {
                                    opacity: requiredToChainType &&
                                        requiredToChainType !== bookmark.chainType
                                        ? 0.5
                                        : 1,
                                }, children: _jsx(MoreHoriz, { fontSize: "small" }) })] }, bookmark.address))), !bookmarks.length && (_jsx(EmptyListIndicator, { icon: _jsx(TurnedIn, { sx: { fontSize: 48 } }), children: t('sendToWallet.noBookmarkedWallets') })), _jsxs(Menu, { id: moreMenuId, elevation: 0, anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, anchorEl: moreMenuAnchorEl, open: open, onClose: closeMenu, children: [_jsxs(MenuItem, { onClick: handleCopyAddress, children: [_jsx(ContentCopyRounded, {}), t('button.copyAddress')] }), _jsxs(MenuItem, { onClick: handleViewOnExplorer, children: [_jsx(OpenInNewRounded, {}), t('button.viewOnExplorer')] }), _jsxs(MenuItem, { onClick: handleRemoveBookmark, children: [_jsx(DeleteOutline, {}), t('button.delete')] })] })] }), _jsx(BookmarkButtonContainer, { children: _jsx(Button, { variant: "contained", onClick: handleAddBookmark, children: t('sendToWallet.addBookmark') }) }), _jsx(BookmarkAddressSheet, { ref: bookmarkAddressSheetRef, onAddBookmark: addBookmark })] }));
};
//# sourceMappingURL=BookmarksPage.js.map