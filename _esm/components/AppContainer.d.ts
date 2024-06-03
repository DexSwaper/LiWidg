import type { PropsWithChildren } from 'react';
import type { WidgetVariant } from '../types/widget.js';
export declare const maxHeight = 682;
export declare const AppExpandedContainer: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    variant?: WidgetVariant | undefined;
}, {}, {}>;
export declare const RelativeContainer: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    variant?: WidgetVariant | undefined;
}, {}, {}>;
export declare const FlexContainer: import("@emotion/styled").StyledComponent<import("@mui/material").ContainerOwnProps & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "fixed" | "maxWidth" | "children" | "sx" | "style" | "className" | "classes" | "disableGutters"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const AppContainer: React.FC<PropsWithChildren<{}>>;
