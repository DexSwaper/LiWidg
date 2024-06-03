import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useRef } from 'react';
import { createWithEqualityFn } from 'zustand/traditional';
export const HeaderStoreContext = createContext(null);
export function HeaderStoreProvider({ children, ...props }) {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = createHeaderStore(props);
    }
    return (_jsx(HeaderStoreContext.Provider, { value: storeRef.current, children: children }));
}
export function useHeaderStoreContext() {
    const useStore = useContext(HeaderStoreContext);
    if (!useStore) {
        throw new Error(`You forgot to wrap your component in <${HeaderStoreProvider.name}>.`);
    }
    return useStore;
}
export function useHeaderStore(selector) {
    const useStore = useHeaderStoreContext();
    return useStore(selector);
}
export const createHeaderStore = ({ namePrefix }) => createWithEqualityFn((set, get) => ({
    setAction: (element) => {
        set(() => ({
            element,
        }));
        return get().removeAction;
    },
    setTitle: (title) => {
        set(() => ({
            title,
        }));
        return get().removeTitle;
    },
    removeAction: () => {
        set(() => ({
            element: null,
        }));
    },
    removeTitle: () => {
        set(() => ({
            title: undefined,
        }));
    },
}), Object.is);
//# sourceMappingURL=useHeaderStore.js.map