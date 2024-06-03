/// <reference types="react" resolution-mode="require"/>
export interface PageContainerProps {
    halfGutters?: boolean;
    topGutters?: boolean;
    bottomGutters?: boolean;
}
export declare const PageContainer: import("@emotion/styled").StyledComponent<import("@mui/material").ContainerOwnProps & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "fixed" | "maxWidth" | "children" | "sx" | "style" | "className" | "classes" | "disableGutters"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & PageContainerProps, {}, {}>;
