import { jsxs as _jsxs } from "react/jsx-runtime";
import { AlertMessageCard, AlertMessageCardTitle, } from './AlertMessage.style.js';
export const AlertMessage = ({ title, icon, children, multilineTitle, severity = 'info', ...rest }) => (_jsxs(AlertMessageCard, { severity: severity, ...rest, children: [_jsxs(AlertMessageCardTitle, { severity: severity, alignItems: multilineTitle ? 'start' : 'center', children: [icon, title] }), children] }));
//# sourceMappingURL=AlertMessage.js.map