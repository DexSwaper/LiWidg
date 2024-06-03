/**
 * Format token amount to at least 4 decimals.
 * @param amount amount to format.
 * @returns formatted amount.
 */
export declare const formatTokenAmount: (amount: bigint | undefined, decimals: number, decimalPlaces?: number) => string;
export declare const formatSlippage: (slippage?: string, defaultValue?: string, returnInitial?: boolean) => string;
export declare const formatInputAmount: (amount: string, decimals?: number | null, returnInitial?: boolean) => string;
export declare const formatTokenPrice: (amount?: string, price?: string) => number;
