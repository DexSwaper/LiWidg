/// <reference types="react" resolution-mode="require"/>
import type { PersistStoreProps, PersistStoreProviderProps } from '../types.js';
import type { HeaderState, HeaderStore } from './types.js';
export declare const HeaderStoreContext: import("react").Context<HeaderStore | null>;
export declare function HeaderStoreProvider({ children, ...props }: PersistStoreProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useHeaderStoreContext(): HeaderStore;
export declare function useHeaderStore<T>(selector: (state: HeaderState) => T): T;
export declare const createHeaderStore: ({ namePrefix }: PersistStoreProps) => import("zustand/traditional").UseBoundStoreWithEqualityFn<import("zustand").StoreApi<HeaderState>>;
