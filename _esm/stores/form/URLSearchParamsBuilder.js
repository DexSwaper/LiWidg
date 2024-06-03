import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFieldValues } from '../form/useFieldValues.js';
import { useTouchedFields } from '../form/useTouchedFields.js';
const formValueKeys = [
    'fromAmount',
    'fromChain',
    'fromToken',
    'toAddress',
    'toChain',
    'toToken',
];
export const URLSearchParamsBuilder = () => {
    const { pathname } = useLocation();
    const touchedFields = useTouchedFields();
    const values = useFieldValues(...formValueKeys);
    useEffect(() => {
        const url = new URL(window.location);
        formValueKeys.forEach((key, index) => {
            const value = values[index];
            if (touchedFields[key] && value) {
                url.searchParams.set(key, value.toString());
            }
            else if (url.searchParams.has(key) && !values[index]) {
                url.searchParams.delete(key);
            }
        });
        url.searchParams.sort();
        window.history.replaceState(window.history.state, '', url);
    }, [pathname, touchedFields, values]);
    return null;
};
//# sourceMappingURL=URLSearchParamsBuilder.js.map