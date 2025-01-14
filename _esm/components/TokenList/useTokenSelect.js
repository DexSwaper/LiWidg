import { useCallback } from 'react';
import { useWidgetEvents } from '../../hooks/useWidgetEvents.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { useChainOrderStoreContext } from '../../stores/chains/ChainOrderStore.js';
import { FormKeyHelper } from '../../stores/form/types.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useFieldController } from '../../stores/form/useFieldController.js';
import { WidgetEvent } from '../../types/events.js';
export const useTokenSelect = (formType, onClick) => {
    const { subvariant } = useWidgetConfig();
    const emitter = useWidgetEvents();
    const { setFieldValue, getFieldValues } = useFieldActions();
    const tokenKey = FormKeyHelper.getTokenKey(formType);
    const { onChange } = useFieldController({ name: tokenKey });
    const chainOrderStore = useChainOrderStoreContext();
    return useCallback((tokenAddress, chainId) => {
        onChange(tokenAddress);
        const selectedChainId = chainId ?? getFieldValues(FormKeyHelper.getChainKey(formType))[0];
        // Set chain again to trigger URL builder update
        setFieldValue(FormKeyHelper.getChainKey(formType), selectedChainId, {
            isDirty: true,
            isTouched: true,
        });
        setFieldValue(FormKeyHelper.getAmountKey(formType), '');
        const oppositeFormType = formType === 'from' ? 'to' : 'from';
        const [selectedOppositeToken, selectedOppositeChainId] = getFieldValues(FormKeyHelper.getTokenKey(oppositeFormType), FormKeyHelper.getChainKey(oppositeFormType));
        if (selectedOppositeToken === tokenAddress &&
            selectedOppositeChainId === selectedChainId &&
            subvariant !== 'custom') {
            setFieldValue(FormKeyHelper.getTokenKey(oppositeFormType), '', {
                isDirty: true,
                isTouched: true,
            });
        }
        // Check if the selected source chain matches any chain on the destination chain selection view (chainOrder array).
        // If a match exists and the destination token is not selected, update the destination chain to match the source.
        if (formType === 'from' &&
            !selectedOppositeToken &&
            selectedChainId &&
            chainOrderStore.getState().chainOrder.to.includes(selectedChainId)) {
            setFieldValue(FormKeyHelper.getChainKey('to'), selectedChainId, {
                isDirty: true,
                isTouched: true,
            });
        }
        const eventToEmit = formType === 'from'
            ? WidgetEvent.SourceChainTokenSelected
            : WidgetEvent.DestinationChainTokenSelected;
        if (selectedChainId) {
            emitter.emit(eventToEmit, {
                chainId: selectedChainId,
                tokenAddress,
            });
        }
        onClick?.();
    }, [
        chainOrderStore,
        emitter,
        formType,
        getFieldValues,
        onChange,
        onClick,
        setFieldValue,
        subvariant,
    ]);
};
//# sourceMappingURL=useTokenSelect.js.map