import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EVMProvider } from './EVMProvider.js';
import { SDKProviders } from './SDKProviders.js';
import { SVMProvider } from './SVMProvider.js';
export const WalletProvider = ({ children }) => {
    return (_jsx(EVMProvider, { children: _jsxs(SVMProvider, { children: [_jsx(SDKProviders, {}), children] }) }));
};
//# sourceMappingURL=WalletProvider.js.map