import { getChainTypeFromAddress } from '../../utils/chainType.js';
export const attemptToFindMatchingToAddressInConfig = (address, config) => {
    if (config.toAddress && config.toAddress.address === address) {
        return config.toAddress;
    }
    if (config.toAddresses?.length) {
        const matchingToAddress = config.toAddresses.find((toAddress) => toAddress.address === address);
        if (matchingToAddress) {
            return matchingToAddress;
        }
    }
    return {
        address: address,
        chainType: getChainTypeFromAddress(address),
    };
};
//# sourceMappingURL=utils.js.map