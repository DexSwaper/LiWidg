export const formatChain = (chain) => ({
    ...chain,
    ...chain.metamask,
    blockExplorers: chain.metamask.blockExplorerUrls.reduce((blockExplorers, blockExplorer, index) => {
        blockExplorers[index === 0 ? 'default' : `${index}`] = {
            name: blockExplorer,
            url: blockExplorer,
        };
        return blockExplorers;
    }, {}),
    name: chain.metamask.chainName,
    rpcUrls: {
        default: { http: chain.metamask.rpcUrls },
        public: { http: chain.metamask.rpcUrls },
    },
    contracts: {
        ...(chain.multicallAddress
            ? { multicall3: { address: chain.multicallAddress } }
            : undefined),
    },
});
//# sourceMappingURL=utils.js.map