import { ChainType, EVM, Solana, config } from '@lifi/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { getWalletClient, switchChain } from '@wagmi/core';
import { useEffect } from 'react';
import { useConfig } from 'wagmi';
import { useWidgetConfig } from '../WidgetProvider/WidgetProvider.js';
export const SDKProviders = () => {
    const { sdkConfig } = useWidgetConfig();
    const { wallet } = useWallet();
    const wagmiConfig = useConfig();
    useEffect(() => {
        // Configure SDK Providers
        const providers = [];
        const hasConfiguredEVMProvider = sdkConfig?.providers?.some((provider) => provider.type === ChainType.EVM);
        const hasConfiguredSVMProvider = sdkConfig?.providers?.some((provider) => provider.type === ChainType.SVM);
        if (!hasConfiguredEVMProvider) {
            providers.push(EVM({
                getWalletClient: () => getWalletClient(wagmiConfig),
                switchChain: async (chainId) => {
                    const chain = await switchChain(wagmiConfig, { chainId });
                    return getWalletClient(wagmiConfig, { chainId: chain.id });
                },
            }));
        }
        if (!hasConfiguredSVMProvider) {
            providers.push(Solana({
                async getWalletAdapter() {
                    return wallet?.adapter;
                },
            }));
        }
        if (sdkConfig?.providers?.length) {
            providers.push(...sdkConfig?.providers);
        }
        config.setProviders(providers);
    }, [sdkConfig?.providers, wagmiConfig, wallet?.adapter]);
    return null;
};
//# sourceMappingURL=SDKProviders.js.map