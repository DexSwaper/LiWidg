import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
export const useSendToWalletStore = createWithEqualityFn((set) => ({
    showSendToWallet: false,
    showSendToWalletDirty: false,
    toggleSendToWallet: () => set((state) => ({
        showSendToWallet: !state.showSendToWallet,
        showSendToWalletDirty: true,
    })),
    setSendToWallet: (value) => set({
        showSendToWallet: value,
        showSendToWalletDirty: true,
    }),
}), Object.is);
export const useSendToWalletActions = () => {
    const actions = useSendToWalletStore((store) => ({
        toggleSendToWallet: store.toggleSendToWallet,
        setSendToWallet: store.setSendToWallet,
    }), shallow);
    return actions;
};
//# sourceMappingURL=useSendToWalletStore.js.map