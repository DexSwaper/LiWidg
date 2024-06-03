/// <reference types="react" resolution-mode="require"/>
import type { WidgetDrawerProps } from './types/widget.js';
export interface WidgetDrawer {
    isOpen(): void;
    toggleDrawer(): void;
    openDrawer(): void;
    closeDrawer(): void;
}
export declare const AppDrawer: import("react").ForwardRefExoticComponent<WidgetDrawerProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<WidgetDrawer>>;
