/// <reference types="react" resolution-mode="require"/>
import type { FormType } from '../../stores/form/types.js';
export declare const SelectTokenCardHeader: import("@emotion/styled").StyledComponent<import("@mui/material").CardHeaderOwnProps<"span", "span"> & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "title" | "sx" | "style" | "className" | "action" | "classes" | "disableTypography" | "subheader" | "avatar" | "subheaderTypographyProps" | "titleTypographyProps"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    selected?: boolean | undefined;
    compact?: boolean | undefined;
}, {}, {}>;
export declare const SelectTokenCard: import("@emotion/styled").StyledComponent<import("@mui/material").CardOwnProps & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "children" | "sx" | "style" | "className" | "elevation" | "classes" | "variant" | "square" | "raised"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & import("../Card/Card.js").CardProps, {}, {}>;
export declare const CardContent: import("@emotion/styled").StyledComponent<import("@mui/material").CardContentOwnProps & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "children" | "sx" | "style" | "className" | "classes"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    formType: FormType;
    compact: boolean;
}, {}, {}>;
