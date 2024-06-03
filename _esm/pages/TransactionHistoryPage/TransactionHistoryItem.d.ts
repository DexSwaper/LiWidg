/// <reference types="react" resolution-mode="require"/>
import type { StatusResponse } from '@lifi/sdk';
export declare const TransactionHistoryItem: React.FC<{
    transaction: StatusResponse;
    size: number;
    start: number;
}>;
