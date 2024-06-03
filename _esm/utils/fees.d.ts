import type { FeeCost, GasCost, Route, Token } from '@lifi/sdk';
export interface FeesBreakdown {
    amount: bigint;
    amountUSD: number;
    token: Token;
}
export declare const getGasCostsBreakdown: (route: Route) => FeesBreakdown[];
export declare const getFeeCostsBreakdown: (route: Route, included?: boolean) => FeesBreakdown[];
export declare const getStepFeeCostsBreakdown: (feeCosts: FeeCost[] | GasCost[]) => FeesBreakdown;
