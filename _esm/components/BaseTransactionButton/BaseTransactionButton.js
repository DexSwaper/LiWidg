import { jsx as _jsx } from "react/jsx-runtime";
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount.js';
import { useChain } from '../../hooks/useChain.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { useFieldValues } from '../../stores/form/useFieldValues.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
export const BaseTransactionButton = ({ onClick, text, disabled, loading, }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { walletConfig } = useWidgetConfig();
    const [fromChainId] = useFieldValues('fromChain');
    const { chain } = useChain(fromChainId);
    const { account } = useAccount({ chainType: chain?.chainType });
    const handleClick = async () => {
        if (account.isConnected) {
            onClick?.();
        }
        else if (walletConfig?.onConnect) {
            walletConfig.onConnect();
        }
        else {
            navigate(navigationRoutes.selectWallet);
        }
    };
    const getButtonText = () => {
        if (account.isConnected) {
            if (text) {
                return text;
            }
        }
        return t(`button.connectWallet`);
    };
    return (_jsx(LoadingButton, { variant: "contained", color: "primary", onClick: handleClick, disabled: account.isConnected && disabled, loading: loading, loadingPosition: "center", fullWidth: true, children: getButtonText() }));
};
//# sourceMappingURL=BaseTransactionButton.js.map