import { shallow } from 'zustand/shallow';
import { useSettingsStore } from './useSettingsStore.js';
export const useAppearance = () => {
    const [appearance, setValue] = useSettingsStore((state) => [state.appearance, state.setValue], shallow);
    const setAppearance = (appearance) => {
        setValue('appearance', appearance);
    };
    return [appearance, setAppearance];
};
//# sourceMappingURL=useAppearance.js.map