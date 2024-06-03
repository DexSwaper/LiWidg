import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useFieldActions } from '../../../stores/form/useFieldActions.js';
import { NFTBase } from './NFTBase.js';
export const NFT = ({ imageUrl, isLoading, collectionName, assetName, owner, token, contractCall, }) => {
    const { setFieldValue } = useFieldActions();
    useEffect(() => {
        if (token) {
            setFieldValue('toChain', token.chainId, { isTouched: true });
            setFieldValue('toToken', token.address, { isTouched: true });
            setFieldValue('toAmount', token.amount?.toString(), {
                isTouched: true,
            });
        }
        if (contractCall) {
            setFieldValue('contractCalls', [contractCall], {
                isTouched: true,
            });
        }
    }, [contractCall, setFieldValue, token]);
    return (_jsx(NFTBase, { isLoading: isLoading, imageUrl: imageUrl, collectionName: collectionName, assetName: assetName, owner: owner, token: token }));
};
//# sourceMappingURL=NFT.js.map