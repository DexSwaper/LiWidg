import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { GasMessage } from '../../components/GasMessage/GasMessage.js';
import { ToAddressRequiredMessage } from '../../components/ToAddressRequiredMessage.js';
import { useRoutes } from '../../hooks/useRoutes.js';
export const MainMessages = (props) => {
    const { routes } = useRoutes();
    const currentRoute = routes?.[0];
    return (_jsxs(_Fragment, { children: [_jsx(ToAddressRequiredMessage, { route: currentRoute, ...props }), _jsx(GasMessage, { route: currentRoute, ...props })] }));
};
//# sourceMappingURL=MainMessages.js.map