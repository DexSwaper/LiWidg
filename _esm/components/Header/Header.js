import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from 'react-router-dom';
import { useDefaultElementId } from '../../hooks/useDefaultElementId.js';
import { ElementId, createElementId } from '../../utils/elements.js';
import { stickyHeaderRoutes } from '../../utils/navigationRoutes.js';
import { Container } from './Header.style.js';
import { NavigationHeader } from './NavigationHeader.js';
import { WalletHeader } from './WalletHeader.js';
export const HeaderContainer = ({ children }) => {
    const { pathname } = useLocation();
    const elementId = useDefaultElementId();
    return (_jsx(Container, { id: createElementId(ElementId.Header, elementId), sticky: stickyHeaderRoutes.some((route) => pathname.includes(route)), children: children }));
};
export const Header = () => {
    return (_jsxs(HeaderContainer, { children: [_jsx(WalletHeader, {}), _jsx(NavigationHeader, {})] }));
};
//# sourceMappingURL=Header.js.map