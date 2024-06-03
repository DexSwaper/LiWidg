import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Error, History, TurnedIn, Wallet } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ButtonTertiary } from '../../components/ButtonTertiary.js';
import { CardButton } from '../../components/Card/CardButton.js';
import { useAccount } from '../../hooks/useAccount.js';
import { AddressType, useAddressValidation, } from '../../hooks/useAddressValidation.js';
import { useChain } from '../../hooks/useChain.js';
import { useHeader } from '../../hooks/useHeader.js';
import { useToAddressRequirements } from '../../hooks/useToAddressRequirements.js';
import { useBookmarkActions } from '../../stores/bookmarks/useBookmarkActions.js';
import { useBookmarks } from '../../stores/bookmarks/useBookmarks.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useFieldValues } from '../../stores/form/useFieldValues.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { BookmarkAddressSheet } from './BookmarkAddressSheet.js';
import { ConfirmAddressSheet } from './ConfirmAddressSheet.js';
import { AddressInput, SendToWalletButtonRow, SendToWalletCard, SendToWalletIconButton, SendToWalletPageContainer, ValidationAlert, } from './SendToWalletPage.style.js';
export const SendToWalletPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const bookmarkAddressSheetRef = useRef(null);
    const confirmAddressSheetRef = useRef(null);
    const { bookmarks, recentWallets } = useBookmarks();
    const { addBookmark, getBookmark, setSelectedBookmark, getSelectedBookmark, addRecentWallet, } = useBookmarkActions();
    const { setFieldValue } = useFieldActions();
    const [inputAddressValue, setInputAddressValue] = useState(() => getSelectedBookmark()?.address ?? '');
    const [validatedWallet, setValidatedWallet] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const { validateAddress, isValidating } = useAddressValidation();
    const { accounts } = useAccount();
    const connectedWallets = accounts.filter((account) => account.isConnected);
    const { requiredToChainType } = useToAddressRequirements();
    const [toChainId] = useFieldValues('toChain');
    const { chain: toChain } = useChain(toChainId);
    const [isDoneButtonLoading, setIsDoneButtonLoading] = useState(false);
    const [isBookmarkButtonLoading, setIsBookmarkButtonLoading] = useState(false);
    useHeader(t(`header.sendToWallet`));
    const handleInputChange = (e) => {
        if (errorMessage) {
            setErrorMessage('');
        }
        if (getSelectedBookmark()) {
            setFieldValue('toAddress', '', { isTouched: true });
            setSelectedBookmark();
        }
        setInputAddressValue(e.target.value.trim());
    };
    const handleDone = async () => {
        if (isValidating) {
            return;
        }
        if (!inputAddressValue) {
            setErrorMessage(t('error.title.walletAddressRequired'));
            return;
        }
        setIsDoneButtonLoading(true);
        const validationResult = await validateAddress({
            value: inputAddressValue,
            chainType: requiredToChainType,
            chain: toChain,
        });
        setIsDoneButtonLoading(false);
        if (!validationResult.isValid) {
            setErrorMessage(validationResult.error);
            return;
        }
        if (requiredToChainType &&
            requiredToChainType !== validationResult.chainType) {
            setErrorMessage(t('error.title.walletChainTypeInvalid', {
                chainName: toChain?.name,
            }));
            return;
        }
        setValidatedWallet({
            name: validationResult.addressType === AddressType.NameService
                ? inputAddressValue
                : undefined,
            address: validationResult.address,
            chainType: validationResult.chainType,
        });
        confirmAddressSheetRef.current?.open();
    };
    const handleBookmarkAddress = async () => {
        if (isValidating) {
            return;
        }
        if (!inputAddressValue) {
            setErrorMessage(t('error.title.walletAddressRequired'));
            return;
        }
        const existingBookmarkWallet = getBookmark(inputAddressValue);
        if (existingBookmarkWallet) {
            setErrorMessage(t('error.title.bookmarkAlreadyExists', {
                name: existingBookmarkWallet.name,
            }));
            return;
        }
        setIsBookmarkButtonLoading(true);
        const validationResult = await validateAddress({
            value: inputAddressValue,
        });
        setIsBookmarkButtonLoading(false);
        if (validationResult.isValid) {
            setValidatedWallet({
                name: validationResult.addressType === AddressType.NameService
                    ? inputAddressValue
                    : undefined,
                address: validationResult.address,
                chainType: validationResult.chainType,
            });
            bookmarkAddressSheetRef.current?.open();
        }
        else {
            setErrorMessage(validationResult.error);
        }
    };
    const handleRecentWalletsClick = () => {
        navigate(navigationRoutes.recentWallets);
    };
    const handleConnectedWalletsClick = () => {
        navigate(navigationRoutes.connectedWallets);
    };
    const handleBookmarkedWalletsClick = () => {
        navigate(navigationRoutes.bookmarks);
    };
    const handleAddBookmark = (bookmark) => {
        addBookmark(bookmark);
        navigate(navigationRoutes.bookmarks);
    };
    const handleOnConfirm = (confirmedWallet) => {
        setSelectedBookmark(confirmedWallet);
        addRecentWallet(confirmedWallet);
    };
    const placeholder = t('sendToWallet.enterAddress', {
        context: 'long',
    });
    return (_jsxs(SendToWalletPageContainer, { bottomGutters: true, children: [_jsxs(SendToWalletCard, { type: errorMessage ? 'error' : 'default', sx: {
                    marginBottom: 6,
                }, children: [_jsx(AddressInput, { size: "small", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", onChange: handleInputChange, value: inputAddressValue, placeholder: placeholder, "aria-label": placeholder, maxRows: 2, inputProps: { maxLength: 128 }, multiline: true }), errorMessage ? (_jsx(ValidationAlert, { icon: _jsx(Error, {}), sx: { pb: 2, paddingX: 2 }, children: errorMessage })) : null, _jsxs(SendToWalletButtonRow, { sx: { paddingX: 2, paddingBottom: 2 }, children: [_jsx(ButtonTertiary, { variant: "text", onClick: handleDone, loading: isDoneButtonLoading, loadingPosition: "center", sx: { flexGrow: 1 }, children: t('button.done') }), _jsx(Tooltip, { title: t('button.bookmark'), arrow: true, children: _jsx(SendToWalletIconButton, { onClick: handleBookmarkAddress, loading: isBookmarkButtonLoading, loadingPosition: "center", children: _jsx(TurnedIn, { fontSize: "small" }) }) })] }), _jsx(ConfirmAddressSheet, { ref: confirmAddressSheetRef, validatedBookmark: validatedWallet, onConfirm: handleOnConfirm }), _jsx(BookmarkAddressSheet, { ref: bookmarkAddressSheetRef, validatedWallet: validatedWallet, onAddBookmark: handleAddBookmark })] }), _jsx(CardButton, { title: t('header.recentWallets'), icon: _jsx(History, {}), onClick: handleRecentWalletsClick, children: !!recentWallets.length && (_jsx(Typography, { color: "text.secondary", children: recentWallets.length })) }), _jsx(CardButton, { title: t('sendToWallet.connectedWallets'), icon: _jsx(Wallet, {}), onClick: handleConnectedWalletsClick, children: !!connectedWallets.length && (_jsx(Typography, { color: "text.secondary", children: connectedWallets.length })) }), _jsx(CardButton, { title: t('header.bookmarkedWallets'), icon: _jsx(TurnedIn, {}), onClick: handleBookmarkedWalletsClick, children: !!bookmarks.length && (_jsx(Typography, { color: "text.secondary", children: bookmarks.length })) })] }));
};
//# sourceMappingURL=SendToWalletPage.js.map