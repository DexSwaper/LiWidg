import { jsx as _jsx } from "react/jsx-runtime";
import { Search } from '@mui/icons-material';
import { FormControl, InputAdornment } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InputCard } from '../../components/Card/InputCard.js';
import { useFieldActions } from '../../stores/form/useFieldActions.js';
import { useFieldController } from '../../stores/form/useFieldController.js';
import { Input } from './SearchTokenInput.style.js';
export const SearchTokenInput = () => {
    const { t } = useTranslation();
    const { setFieldValue } = useFieldActions();
    const { onChange, onBlur, name, value } = useFieldController({
        name: 'tokenSearchFilter',
    });
    useEffect(() => () => {
        setFieldValue('tokenSearchFilter', '');
    }, [setFieldValue]);
    return (_jsx(InputCard, { children: _jsx(FormControl, { fullWidth: true, children: _jsx(Input, { size: "small", placeholder: t(`main.tokenSearch`), endAdornment: _jsx(InputAdornment, { position: "end", children: _jsx(Search, {}) }), inputProps: {
                    inputMode: 'search',
                    onChange: (e) => onChange(e.target.value),
                    onBlur,
                    name,
                    value,
                    maxLength: 128,
                }, autoComplete: "off" }) }) }));
};
//# sourceMappingURL=SearchTokenInput.js.map