export declare const useSettingMonitor: () => {
    isBridgesChanged: boolean;
    isExchangesChanged: boolean;
    isSlippageChanged: boolean;
    isSlippageOutsideRecommendedLimits: boolean;
    isRoutePriorityChanged: boolean;
    isGasPriceChanged: boolean;
    isCustomRouteSettings: boolean;
    isRouteSettingsWithWarnings: boolean;
    reset: () => void;
};
