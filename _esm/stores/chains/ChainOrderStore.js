import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef } from 'react';
import { useChains } from '../../hooks/useChains.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { isItemAllowed } from '../../utils/item.js';
import { useFieldActions } from '../form/useFieldActions.js';
import { createChainOrderStore } from './createChainOrderStore.js';
export const ChainOrderStoreContext = createContext(null);
export function ChainOrderStoreProvider({ children, ...props }) {
    const { chains: configChains } = useWidgetConfig();
    const storeRef = useRef();
    const { chains } = useChains();
    const { setFieldValue, getFieldValues } = useFieldActions();
    if (!storeRef.current) {
        storeRef.current = createChainOrderStore(props);
    }
    useEffect(() => {
        if (chains) {
            ['from', 'to'].forEach((key) => {
                const filteredChains = configChains?.[key]
                    ? chains.filter((chain) => isItemAllowed(chain.id, configChains[key]))
                    : chains;
                const chainOrder = storeRef.current?.getState().initializeChains(filteredChains.map((chain) => chain.id), key);
                if (chainOrder) {
                    const [chainValue] = getFieldValues(`${key}Chain`);
                    if (!chainValue) {
                        setFieldValue(`${key}Chain`, chainOrder[0]);
                    }
                }
            });
        }
    }, [chains, configChains, getFieldValues, setFieldValue]);
    return (_jsx(ChainOrderStoreContext.Provider, { value: storeRef.current, children: children }));
}
export function useChainOrderStoreContext() {
    const useStore = useContext(ChainOrderStoreContext);
    if (!useStore) {
        throw new Error(`You forgot to wrap your component in <${ChainOrderStoreProvider.name}>.`);
    }
    return useStore;
}
export function useChainOrderStore(selector, equalityFn) {
    const useStore = useChainOrderStoreContext();
    return useStore(selector, equalityFn);
}
//# sourceMappingURL=ChainOrderStore.js.map