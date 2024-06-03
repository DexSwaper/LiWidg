/// <reference types="react" resolution-mode="require"/>
import type { WidgetSubvariant } from '../../types/widget.js';
export declare const HeaderAppBar: import("@emotion/styled").StyledComponent<import("@mui/material").AppBarOwnProps & Omit<import("@mui/material").PaperOwnProps, "color" | "position" | "classes"> & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLElement>, HTMLElement>, "ref"> & {
    ref?: ((instance: HTMLElement | null) => void) | import("react").RefObject<HTMLElement> | null | undefined;
}, "color" | "position" | "children" | "sx" | "style" | "className" | "elevation" | "classes" | "variant" | "square" | "enableColorOnDark"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const Container: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    sticky?: boolean | undefined;
}, {}, {}>;
export declare const WalletButton: import("@emotion/styled").StyledComponent<import("@mui/material").ButtonOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void) | import("react").RefObject<HTMLButtonElement> | null | undefined;
}, "color" | "children" | "sx" | "style" | "className" | "tabIndex" | "href" | "disabled" | "action" | "size" | "classes" | "variant" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef" | "disableElevation" | "disableFocusRipple" | "endIcon" | "fullWidth" | "startIcon"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    subvariant?: WidgetSubvariant | undefined;
}, {}, {}>;
export declare const DrawerWalletContainer: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const HeaderControlsContainer: import("@emotion/styled").StyledComponent<import("@mui/system").BoxOwnProps<import("@mui/material").Theme> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, keyof import("@mui/system").BoxOwnProps<import("@mui/material").Theme>> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const WalletAvatar: import("@emotion/styled").StyledComponent<import("@mui/material").AvatarOwnProps & import("@mui/material").AvatarSlotsAndSlotProps & import("@mui/material/OverridableComponent.js").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "children" | "sx" | "style" | "className" | "sizes" | "alt" | "src" | "srcSet" | "classes" | "variant" | "imgProps" | "slots" | "slotProps"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
