/// <reference types="react" resolution-mode="require"/>
import type { Theme } from '@mui/material';
export declare const SettingsFieldSet: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<Theme>> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
interface SlippageDefaultProps {
    selected?: boolean;
}
export declare const SlippageDefaultButton: import("@emotion/styled").StyledComponent<import("@mui/material").ButtonBaseOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void) | import("react").RefObject<HTMLButtonElement> | null | undefined;
}, "children" | "sx" | "style" | "className" | "tabIndex" | "disabled" | "action" | "classes" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef"> & import("@mui/system").MUIStyledCommonProps<Theme> & SlippageDefaultProps, {}, {}>;
export declare const SlippageCustomInput: import("@emotion/styled").StyledComponent<import("@mui/material").InputBaseProps & import("@mui/system").MUIStyledCommonProps<Theme> & SlippageDefaultProps, {}, {}>;
export declare const SlippageLimitsWarningContainer: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<Theme>> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export {};
