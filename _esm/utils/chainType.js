import { ChainId, ChainType } from '@lifi/sdk';
import { isAddress as isEVMAddress } from 'viem';
import { isSVMAddress } from './svm.js';
const chainTypeAddressValidation = {
    [ChainType.EVM]: isEVMAddress,
    [ChainType.SVM]: isSVMAddress,
    [ChainType.UTXO]: () => false,
};
export const getChainTypeFromAddress = (address) => {
    for (const chainType in chainTypeAddressValidation) {
        const isChainType = chainTypeAddressValidation[chainType](address);
        if (isChainType) {
            return chainType;
        }
    }
};
export const defaultChainIdsByType = {
    [ChainType.EVM]: ChainId.ETH,
    [ChainType.SVM]: ChainId.SOL,
    [ChainType.UTXO]: ChainId.BTC,
};
//# sourceMappingURL=chainType.js.map