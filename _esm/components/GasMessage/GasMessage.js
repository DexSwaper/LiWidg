import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Collapse } from '@mui/material';
import { useFromTokenSufficiency } from '../../hooks/useFromTokenSufficiency.js';
import { useGasSufficiency } from '../../hooks/useGasSufficiency.js';
import { FundsSufficiencyMessage } from './FundsSufficiencyMessage.js';
import { GasSufficiencyMessage } from './GasSufficiencyMessage.js';
export const GasMessage = ({ route, ...props }) => {
    const { insufficientGas } = useGasSufficiency(route);
    const { insufficientFromToken } = useFromTokenSufficiency(route);
    const validInsufficientGas = insufficientGas?.length;
    return (_jsx(Collapse, { timeout: 225, in: Boolean(insufficientFromToken || validInsufficientGas), unmountOnExit: true, mountOnEnter: true, children: _jsx(Box, { ...props, children: insufficientFromToken ? (_jsx(FundsSufficiencyMessage, {})) : validInsufficientGas ? (_jsx(GasSufficiencyMessage, { insufficientGas: insufficientGas })) : null }) }));
};
//# sourceMappingURL=GasMessage.js.map