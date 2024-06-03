import { jsx as _jsx } from "react/jsx-runtime";
import { ArrowDownward, ArrowForward } from '@mui/icons-material';
import { useAvailableChains } from '../../hooks/useAvailableChains.js';
import { useToAddressReset } from '../../hooks/useToAddressReset.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { IconCard, ReverseContainer } from './ReverseTokensButton.style.js';
export const ReverseTokensButton = ({ vertical, }) => {
    const { setFieldValue, getFieldValues } = useFieldActions();
    const { getChainById } = useAvailableChains();
    const { tryResetToAddress } = useToAddressReset();
    const handleClick = () => {
        const [fromChainId, fromToken, toChainId, toToken] = getFieldValues('fromChain', 'fromToken', 'toChain', 'toToken');
        setFieldValue('fromAmount', '', { isTouched: true });
        setFieldValue('fromChain', toChainId, { isTouched: true });
        setFieldValue('fromToken', toToken, { isTouched: true });
        setFieldValue('toChain', fromChainId, { isTouched: true });
        setFieldValue('toToken', fromToken, { isTouched: true });
        // fromChainId becomes toChainId after using reverse
        const toChain = getChainById(fromChainId);
        if (toChain) {
            tryResetToAddress(toChain);
        }
    };
    return (_jsx(ReverseContainer, { children: _jsx(IconCard, { onClick: handleClick, children: vertical ? (_jsx(ArrowDownward, { fontSize: "inherit" })) : (_jsx(ArrowForward, { fontSize: "inherit" })) }) }));
};
//# sourceMappingURL=ReverseTokensButton.js.map