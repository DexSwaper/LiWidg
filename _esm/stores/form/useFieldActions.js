import { shallow } from 'zustand/shallow';
import { useFormStore } from './useFormStore.js';
export const useFieldActions = () => {
    const actions = useFormStore((store) => ({
        getFieldValues: store.getFieldValues,
        isTouched: store.isTouched,
        resetField: store.resetField,
        setAsTouched: store.setAsTouched,
        setDefaultValues: store.setDefaultValues,
        setFieldValue: store.setFieldValue,
    }), shallow);
    return actions;
};
//# sourceMappingURL=useFieldActions.js.map