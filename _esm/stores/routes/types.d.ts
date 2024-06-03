import type { Route, RouteExtended } from '@lifi/sdk';
export interface RouteExecution {
    route: RouteExtended;
    status: RouteExecutionStatus;
}
export interface RouteExecutionState {
    routes: Partial<Record<string, RouteExecution>>;
    setExecutableRoute: (route: Route, insurableRouteId?: string) => void;
    updateRoute: (route: Route) => void;
    restartRoute: (routeId: string) => void;
    deleteRoute: (routeId: string) => void;
    deleteRoutes: (type: 'completed' | 'active') => void;
}
export declare enum RouteExecutionStatus {
    Idle = 0,
    Pending = 1,
    Done = 2,
    Failed = 4,
    Partial = 8,
    Refunded = 16
}
