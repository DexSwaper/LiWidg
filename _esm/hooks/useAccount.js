import { ChainId, ChainType } from '@lifi/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { useAccount as useWagmiAccount } from 'wagmi';
const defaultAccount = {
    isConnected: false,
    isConnecting: false,
    isReconnecting: false,
    isDisconnected: true,
    status: 'disconnected',
};
/**
 *
 * @param args When we provide args we want to return either account with corresponding chainType or default disconnected one
 * @returns - Account result
 */
export const useAccount = (args) => {
    const account = useWagmiAccount();
    const { wallet } = useWallet();
    // We create a simple variable from the args object
    // to avoid re-render useMemo on every object reference change.
    const hasChainTypeArgs = Boolean(args);
    return useMemo(() => {
        const svm = wallet?.adapter.publicKey
            ? {
                address: wallet?.adapter.publicKey.toString(),
                chainId: ChainId.SOL,
                chainType: ChainType.SVM,
                connector: wallet?.adapter,
                isConnected: Boolean(wallet?.adapter.publicKey),
                isConnecting: false,
                isReconnecting: false,
                isDisconnected: !wallet,
                status: 'connected',
            }
            : {
                chainType: ChainType.SVM,
                isConnected: false,
                isConnecting: false,
                isReconnecting: false,
                isDisconnected: true,
                status: 'disconnected',
            };
        const evm = { ...account, chainType: ChainType.EVM };
        const accounts = [evm, svm];
        const connectedAccounts = [evm, svm].filter((account) => account.isConnected);
        return {
            account: hasChainTypeArgs
                ? accounts.find((account) => account.chainType === args?.chainType) ??
                    defaultAccount
                : accounts.find((account) => account.isConnected) ?? defaultAccount,
            // We need to return only connected account list
            accounts: connectedAccounts,
        };
    }, [account, args?.chainType, hasChainTypeArgs, wallet]);
};
//# sourceMappingURL=useAccount.js.map