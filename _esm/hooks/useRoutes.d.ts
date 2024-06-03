import type { Route, RoutesResponse } from '@lifi/sdk';
interface RoutesProps {
    insurableRoute?: Route;
}
export declare const useRoutes: ({ insurableRoute }?: RoutesProps) => {
    routes: Route[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isFetched: boolean;
    dataUpdatedAt: number;
    refetchTime: number;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<RoutesResponse, Error>>;
    fromChain: import("@lifi/sdk").ExtendedChain | undefined;
    toChain: import("@lifi/sdk").ExtendedChain | undefined;
};
export {};
