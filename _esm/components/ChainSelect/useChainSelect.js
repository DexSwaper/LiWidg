import { useChains } from '../../hooks/useChains.js';
import { useSwapOnly } from '../../hooks/useSwapOnly.js';
import { useToAddressReset } from '../../hooks/useToAddressReset.js';
import { useChainOrder } from '../../stores/chains/useChainOrder.js';
import { FormKeyHelper } from '../../stores/form/types.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useFieldController } from '../../stores/form/useFieldController.js';
export const useChainSelect = (formType) => {
    const chainKey = FormKeyHelper.getChainKey(formType);
    const { onChange } = useFieldController({ name: chainKey });
    const { setFieldValue, getFieldValues } = useFieldActions();
    const { chains, isLoading, getChainById } = useChains(formType);
    const [chainOrder, setChainOrder] = useChainOrder(formType);
    const swapOnly = useSwapOnly();
    const { tryResetToAddress } = useToAddressReset();
    const getChains = () => {
        if (!chains) {
            return [];
        }
        const selectedChains = chainOrder
            .map((chainId) => chains.find((chain) => chain.id === chainId))
            .filter(Boolean);
        return selectedChains;
    };
    const setCurrentChain = (chainId) => {
        onChange(chainId);
        if (swapOnly) {
            setFieldValue(FormKeyHelper.getChainKey('to'), chainId, {
                isTouched: true,
            });
        }
        setFieldValue(FormKeyHelper.getTokenKey(formType), '');
        setFieldValue(FormKeyHelper.getAmountKey(formType), '');
        setFieldValue('tokenSearchFilter', '');
        const [toChainId] = getFieldValues('toChain');
        const toChain = getChainById(toChainId);
        if (toChain) {
            tryResetToAddress(toChain);
        }
        setChainOrder(chainId, formType);
    };
    return {
        chainOrder,
        chains,
        getChains,
        isLoading,
        setChainOrder,
        setCurrentChain,
    };
};
//# sourceMappingURL=useChainSelect.js.map