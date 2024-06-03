import { PublicKey } from '@solana/web3.js';
export const isSVMAddress = (address) => {
    try {
        new PublicKey(address);
        return true;
    }
    catch {
        return false;
    }
};
//# sourceMappingURL=svm.js.map