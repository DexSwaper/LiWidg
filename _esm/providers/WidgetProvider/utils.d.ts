import type { WidgetConfig } from '../../types/widget.js';
export declare const attemptToFindMatchingToAddressInConfig: (address: string, config: WidgetConfig) => import("../../types/widget.js").ToAddress | {
    address: string;
    chainType: import("@lifi/types").ChainType | undefined;
};
