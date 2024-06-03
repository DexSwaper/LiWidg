import { ChainType } from '@lifi/sdk';
import { useContext, useMemo } from 'react';
import { EVMExternalContext } from './EVMExternalContext.js';
import { SVMExternalContext } from './SVMExternalContext.js';
export function useHasExternalWalletProvider() {
    const hasExternalEVMContext = useContext(EVMExternalContext);
    const hasExternalSVMContext = useContext(SVMExternalContext);
    const providers = useMemo(() => {
        const providers = [];
        if (hasExternalEVMContext) {
            providers.push(ChainType.EVM);
        }
        if (hasExternalSVMContext) {
            providers.push(ChainType.SVM);
        }
        return providers;
    }, [hasExternalEVMContext, hasExternalSVMContext]);
    return {
        hasExternalProvider: hasExternalEVMContext || hasExternalSVMContext,
        providers,
    };
}
//# sourceMappingURL=useHasExternalWalletProvider.js.map