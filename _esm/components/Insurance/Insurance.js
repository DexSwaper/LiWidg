import { jsx as _jsx } from "react/jsx-runtime";
import { RouteExecutionStatus } from '../../stores/routes/types.js';
import { InsuranceCard } from './InsuranceCard.js';
import { InsuranceCollapsed } from './InsuranceCollapsed.js';
export const Insurance = ({ status, insurableRouteId, onChange, ...props }) => {
    return status === RouteExecutionStatus.Idle ? (_jsx(InsuranceCollapsed, { status: status, insurableRouteId: insurableRouteId, onChange: onChange, ...props })) : (_jsx(InsuranceCard, { status: status, ...props }));
};
//# sourceMappingURL=Insurance.js.map