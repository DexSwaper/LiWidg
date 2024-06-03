import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowForward, ErrorRounded, InfoRounded } from '@mui/icons-material';
import { ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProcessMessage } from '../../hooks/useProcessMessage.js';
import { useRouteExecution } from '../../hooks/useRouteExecution.js';
import { RouteExecutionStatus } from '../../stores/routes/types.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { TokenAvatarGroup } from '../Avatar/Avatar.style.js';
import { TokenAvatar } from '../Avatar/TokenAvatar.js';
import { StepTimer } from '../Step/StepTimer.js';
import { ListItem, ListItemButton } from './ActiveTransactions.style.js';
export const ActiveTransactionItem = ({ routeId, dense }) => {
    const navigate = useNavigate();
    const { route, status } = useRouteExecution({
        routeId,
        executeInBackground: true,
    });
    const lastActiveStep = route?.steps.findLast((step) => step.execution);
    const lastActiveProcess = lastActiveStep?.execution?.process.at(-1);
    const { title } = useProcessMessage(lastActiveStep, lastActiveProcess);
    if (!route || !lastActiveStep) {
        return null;
    }
    const handleClick = () => {
        navigate(navigationRoutes.transactionExecution, { state: { routeId } });
    };
    const getStatusComponent = () => {
        switch (lastActiveProcess?.status) {
            case 'ACTION_REQUIRED':
                return _jsx(InfoRounded, { color: "info", fontSize: "small" });
            case 'FAILED':
                return _jsx(ErrorRounded, { color: "error", fontSize: "small" });
            default:
                return (_jsx(Typography, { fontSize: 14, fontWeight: 500, children: _jsx(StepTimer, { step: lastActiveStep, hideInProgress: true }) }));
        }
    };
    const ListItemComponent = dense ? ListItem : ListItemButton;
    return (_jsxs(ListItemComponent, { onClick: handleClick, dense: true, disableRipple: dense, children: [_jsx(ListItemAvatar, { children: _jsxs(TokenAvatarGroup, { total: 2, children: [_jsx(TokenAvatar, { token: route.fromToken }), _jsx(TokenAvatar, { token: route.toToken })] }) }), _jsx(ListItemText, { sx: { margin: 0 }, disableTypography: true, primary: _jsxs(Typography, { fontWeight: 500, lineHeight: 1, sx: {
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 2,
                        height: 16,
                    }, children: [route.fromToken.symbol, _jsx(ArrowForward, { sx: { paddingX: 0.5 } }), route.toToken.symbol] }), secondary: status !== RouteExecutionStatus.Done ? (_jsx(Typography, { fontWeight: 400, fontSize: 12, color: "text.secondary", lineHeight: 1, mt: 0.75, ml: 2, children: title })) : null }), getStatusComponent()] }));
};
//# sourceMappingURL=ActiveTransactionItem.js.map