import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Container, ScopedCssBaseline, styled } from '@mui/material';
import { useWidgetConfig } from '../providers/WidgetProvider/WidgetProvider.js';
import { ElementId, createElementId } from '../utils/elements.js';
export const maxHeight = 682;
export const AppExpandedContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'variant',
})(({ variant }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flex: 1,
    height: variant === 'drawer' ? 'none' : maxHeight,
}));
export const RelativeContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme, variant }) => ({
    position: 'relative',
    boxSizing: 'content-box',
    width: '100%',
    minWidth: theme.breakpoints.values.xs,
    maxWidth: theme.breakpoints.values.sm,
    maxHeight: variant === 'drawer' ? 'none' : maxHeight,
    background: theme.palette.background.default,
    overflow: 'auto',
    flex: 1,
    zIndex: 0,
    ...theme.container,
}));
const CssBaselineContainer = styled(ScopedCssBaseline, {
    shouldForwardProp: (prop) => prop !== 'variant',
})(({ variant }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflowX: 'clip',
    margin: 0,
    width: '100%',
    maxHeight: variant === 'drawer' ? 'none' : maxHeight,
    overflowY: 'auto',
    height: '100%',
}));
export const FlexContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});
export const AppContainer = ({ children }) => {
    // const ref = useRef<HTMLDivElement>(null);
    const { variant, elementId } = useWidgetConfig();
    return (_jsx(RelativeContainer, { variant: variant, id: createElementId(ElementId.RelativeContainer, elementId), children: _jsx(CssBaselineContainer, { id: createElementId(ElementId.ScrollableContainer, elementId), variant: variant, enableColorScheme: true, children: _jsx(FlexContainer, { disableGutters: true, children: children }) }) }));
};
//# sourceMappingURL=AppContainer.js.map