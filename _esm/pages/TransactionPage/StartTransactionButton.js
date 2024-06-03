import { jsx as _jsx } from "react/jsx-runtime";
import { BaseTransactionButton } from '../../components/BaseTransactionButton/BaseTransactionButton.js';
import { useFromTokenSufficiency } from '../../hooks/useFromTokenSufficiency.js';
import { useGasSufficiency } from '../../hooks/useGasSufficiency.js';
import { useRoutes } from '../../hooks/useRoutes.js';
import { useRouteExecutionStore } from '../../stores/routes/RouteExecutionStore.js';
export const StartTransactionButton = ({ onClick, route, text, loading, }) => {
    const { insufficientGas, isLoading: isGasSufficiencyLoading } = useGasSufficiency(route);
    const { insufficientFromToken, isLoading: isFromTokenSufficiencyLoading } = useFromTokenSufficiency(route);
    const shouldDisableButton = insufficientFromToken || !!insufficientGas?.length;
    return (_jsx(BaseTransactionButton, { onClick: onClick, text: text, disabled: shouldDisableButton, loading: isFromTokenSufficiencyLoading || isGasSufficiencyLoading || loading }));
};
export const StartInsurableTransactionButton = ({ onClick, text, route, loading, disabled, insurableRouteId }) => {
    const routeExecution = useRouteExecutionStore((state) => state.routes[insurableRouteId]);
    const { isFetching } = useRoutes({
        insurableRoute: routeExecution?.route,
    });
    return (_jsx(StartTransactionButton, { onClick: onClick, text: text, route: route, disabled: disabled, loading: loading || isFetching, insurableRouteId: insurableRouteId }));
};
//# sourceMappingURL=StartTransactionButton.js.map