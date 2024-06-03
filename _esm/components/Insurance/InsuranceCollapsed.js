import { jsx as _jsx } from "react/jsx-runtime";
import { Collapse } from '@mui/material';
import { useRoutes } from '../../hooks/useRoutes.js';
import { useRouteExecutionStore } from '../../stores/routes/RouteExecutionStore.js';
import { RouteExecutionStatus } from '../../stores/routes/types.js';
import { useSetExecutableRoute } from '../../stores/routes/useSetExecutableRoute.js';
import { formatTokenAmount } from '../../utils/format.js';
import { InsuranceCard } from './InsuranceCard.js';
export const InsuranceCollapsed = ({ status, insurableRouteId, onChange, ...props }) => {
    const setExecutableRoute = useSetExecutableRoute();
    const routeExecution = useRouteExecutionStore((state) => state.routes[insurableRouteId]);
    const { routes } = useRoutes({
        insurableRoute: routeExecution?.route,
    });
    const insuredRoute = routes?.[0];
    const toggleInsurance = (checked) => {
        if (insuredRoute) {
            if (checked) {
                setExecutableRoute(insuredRoute, insurableRouteId);
            }
            onChange?.(checked ? insuredRoute.id : insurableRouteId);
        }
    };
    if (!insuredRoute) {
        return null;
    }
    return (_jsx(Collapse, { timeout: 225, in: insuredRoute.insurance.state === 'INSURED', unmountOnExit: true, mountOnEnter: true, appear: status === RouteExecutionStatus.Idle, children: _jsx(InsuranceCard, { ...props, status: status, insuredAmount: formatTokenAmount(BigInt(insuredRoute.toAmountMin), insuredRoute.toToken.decimals), insuredTokenSymbol: insuredRoute.toToken.symbol, onChange: toggleInsurance }) }));
};
//# sourceMappingURL=InsuranceCollapsed.js.map