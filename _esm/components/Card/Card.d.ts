/// <reference types="react" resolution-mode="require"/>
import type { CardProps as MuiCardProps } from '@mui/material';
export interface CardProps extends MuiCardProps {
    type?: 'default' | 'selected' | 'error';
    selectionColor?: 'primary' | 'secondary';
    indented?: boolean;
}
export declare const Card: import("@emotion/styled").StyledComponent<import("@mui/material").CardOwnProps & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "children" | "sx" | "style" | "className" | "elevation" | "classes" | "variant" | "square" | "raised"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & CardProps, {}, {}>;
