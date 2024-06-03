import { jsx as _jsx } from "react/jsx-runtime";
import { ReceiptLong } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigateBack } from '../../hooks/useNavigateBack.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
export const TransactionHistoryButton = () => {
    const { t } = useTranslation();
    const { navigate } = useNavigateBack();
    return (_jsx(Tooltip, { title: t(`header.transactionHistory`), enterDelay: 400, arrow: true, children: _jsx(IconButton, { size: "medium", onClick: () => navigate(navigationRoutes.transactionHistory), children: _jsx(ReceiptLong, {}) }) }));
};
//# sourceMappingURL=TransactionHistoryButton.js.map