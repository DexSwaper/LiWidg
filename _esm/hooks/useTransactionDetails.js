import { getStatus } from '@lifi/sdk';
import { keepPreviousData, useQuery, useQueryClient, } from '@tanstack/react-query';
import { useAccount } from './useAccount.js';
export const useTransactionDetails = (transactionHash) => {
    const { account, accounts } = useAccount();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['transaction-history', transactionHash],
        queryFn: async ({ queryKey: [, transactionHash], signal }) => {
            if (transactionHash) {
                for (const account of accounts) {
                    const cachedHistory = queryClient.getQueryData([
                        'transaction-history',
                        account.address,
                    ]);
                    const transaction = cachedHistory?.find((t) => t.sending.txHash === transactionHash);
                    if (transaction) {
                        return transaction;
                    }
                }
                const transaction = await getStatus({
                    txHash: transactionHash,
                }, { signal });
                const fromAddress = transaction?.fromAddress;
                if (fromAddress) {
                    queryClient.setQueryData(['transaction-history', fromAddress], (data) => {
                        return [...data, transaction];
                    });
                }
                return transaction;
            }
        },
        refetchInterval: 300000,
        enabled: Boolean(account.isConnected),
        initialData: () => {
            for (const account of accounts) {
                const transaction = queryClient
                    .getQueryData(['transaction-history', account.address])
                    ?.find((t) => t.sending.txHash === transactionHash);
                if (transaction) {
                    return transaction;
                }
            }
        },
        placeholderData: keepPreviousData,
    });
    return {
        transaction: data,
        isLoading,
    };
};
//# sourceMappingURL=useTransactionDetails.js.map