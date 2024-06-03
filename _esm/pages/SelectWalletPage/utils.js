import { getWalletPriority } from '@lifi/wallet-management';
export const walletComparator = (a, b) => {
    let aId = a.id || a.adapter?.name;
    let bId = b.id || b.adapter?.name;
    const priorityA = getWalletPriority(aId);
    const priorityB = getWalletPriority(bId);
    if (priorityA !== priorityB) {
        return priorityA - priorityB;
    }
    if (aId < bId) {
        return -1;
    }
    if (aId > bId) {
        return 1;
    }
    return 0;
};
//# sourceMappingURL=utils.js.map