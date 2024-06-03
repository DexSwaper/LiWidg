import type { SendToWalletStore } from './types.js';
export declare const useSendToWalletStore: import("zustand/traditional").UseBoundStoreWithEqualityFn<import("zustand").StoreApi<SendToWalletStore>>;
export declare const useSendToWalletActions: () => {
    toggleSendToWallet: () => void;
    setSendToWallet: (value: boolean) => void;
};
