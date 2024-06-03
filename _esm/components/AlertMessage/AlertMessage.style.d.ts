/// <reference types="react" resolution-mode="require"/>
import type { Severity } from './types.js';
interface AlertSeverityProps {
    severity: Severity;
}
export declare const AlertMessageCard: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & AlertSeverityProps, {}, {}>;
export declare const AlertMessageCardTitle: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & AlertSeverityProps, {}, {}>;
export {};
