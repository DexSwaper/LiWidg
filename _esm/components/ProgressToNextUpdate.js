import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
const getProgressValue = (updatedAt, timeToUpdate) => updatedAt
    ? Math.min(100, ((Date.now() - updatedAt) / timeToUpdate) * 100)
    : 0;
const getSecondsToUpdate = (updatedAt, timeToUpdate) => Math.max(Math.round((timeToUpdate - (Date.now() - updatedAt)) / 1000), 0);
export const ProgressToNextUpdate = ({ updatedAt, timeToUpdate, isLoading, onClick, ...other }) => {
    const [value, setValue] = useState(() => getProgressValue(updatedAt, timeToUpdate));
    useEffect(() => {
        setValue(getProgressValue(updatedAt, timeToUpdate));
        const id = setInterval(() => {
            const time = getProgressValue(updatedAt, timeToUpdate);
            setValue(time);
            if (time >= 100) {
                clearInterval(id);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [timeToUpdate, updatedAt]);
    useEffect(() => {
        if (isLoading) {
            setValue(0);
        }
    }, [isLoading]);
    return (_jsx(IconButton, { onClick: onClick, disabled: isLoading, ...other, children: _jsx(Tooltip, { title: _jsx(Trans, { i18nKey: "tooltip.progressToNextUpdate", values: {
                    value: getSecondsToUpdate(updatedAt, timeToUpdate),
                }, components: [_jsx("br", {})] }), placement: "top", enterDelay: 400, arrow: true, children: _jsxs(Box, { sx: {
                    display: 'grid',
                    position: 'relative',
                    placeItems: 'center',
                    width: 24,
                    height: 24,
                }, children: [_jsx(CircularProgress, { variant: "determinate", size: 24, value: 100, sx: (theme) => ({
                            position: 'absolute',
                            color: theme.palette.mode === 'light'
                                ? theme.palette.grey[300]
                                : theme.palette.grey[800],
                        }) }), _jsx(CircularProgress, { variant: isLoading ? 'indeterminate' : 'determinate', size: 24, value: value, sx: (theme) => ({
                            opacity: value === 100 && !isLoading ? 0.5 : 1,
                            color: theme.palette.mode === 'light'
                                ? theme.palette.primary.main
                                : theme.palette.primary.light,
                        }) })] }) }) }));
};
//# sourceMappingURL=ProgressToNextUpdate.js.map