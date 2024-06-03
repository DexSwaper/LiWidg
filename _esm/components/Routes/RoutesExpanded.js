import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Collapse, Grow, Stack, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoutes as useDOMRoutes, useNavigate } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount.js';
import { useRoutes } from '../../hooks/useRoutes.js';
import { useToAddressRequirements } from '../../hooks/useToAddressRequirements.js';
import { useWidgetEvents } from '../../hooks/useWidgetEvents.js';
import { useWidgetConfig } from '../../providers/WidgetProvider/WidgetProvider.js';
import { useFieldValues } from '../../stores/form/useFieldValues.js';
import { useSetExecutableRoute } from '../../stores/routes/useSetExecutableRoute.js';
import { WidgetEvent } from '../../types/events.js';
import { navigationRoutes } from '../../utils/navigationRoutes.js';
import { PageContainer } from '../PageContainer.js';
import { ProgressToNextUpdate } from '../ProgressToNextUpdate.js';
import { RouteCard } from '../RouteCard/RouteCard.js';
import { RouteCardSkeleton } from '../RouteCard/RouteCardSkeleton.js';
import { RouteNotFoundCard } from '../RouteCard/RouteNotFoundCard.js';
import { CollapseContainer, Container, Header, ScrollableContainer, } from './RoutesExpanded.style.js';
const timeout = { enter: 225, exit: 225, appear: 0 };
const routes = [
    {
        path: '/',
        element: true,
    },
    {
        path: '*',
        element: null,
    },
];
export const RoutesExpanded = () => {
    const element = useDOMRoutes(routes);
    const match = Boolean(element?.props?.children);
    return (_jsx(CollapseContainer, { children: _jsx(Collapse, { timeout: timeout, in: match, orientation: "horizontal", children: _jsx(Grow, { timeout: timeout, in: match, mountOnEnter: true, unmountOnExit: true, children: _jsx("div", { children: _jsx(RoutesExpandedElement, {}) }) }) }) }));
};
export const RoutesExpandedElement = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const setExecutableRoute = useSetExecutableRoute();
    const { subvariant } = useWidgetConfig();
    const routesRef = useRef();
    const emitter = useWidgetEvents();
    const routesActiveRef = useRef(false);
    const { routes, isLoading, isFetching, isFetched, dataUpdatedAt, refetchTime, refetch, fromChain, } = useRoutes();
    const { account } = useAccount({ chainType: fromChain?.chainType });
    const [toAddress] = useFieldValues('toAddress');
    const { requiredToAddress } = useToAddressRequirements();
    const handleRouteClick = (route) => {
        setExecutableRoute(route);
        navigate(navigationRoutes.transactionExecution, {
            state: { routeId: route.id },
        });
    };
    const onExit = () => {
        // Clean routes cache on exit
        routesRef.current = undefined;
    };
    // We cache routes results in ref for a better exit animation
    if (routesRef.current && !routes) {
        routesActiveRef.current = false;
    }
    else {
        routesRef.current = routes;
        routesActiveRef.current = Boolean(routes);
    }
    const currentRoute = routesRef.current?.[0];
    const expanded = Boolean(routesActiveRef.current || isLoading || isFetching || isFetched);
    const routeNotFound = !currentRoute && !isLoading && !isFetching && expanded;
    const toAddressUnsatisfied = currentRoute && requiredToAddress && !toAddress;
    const allowInteraction = account.isConnected && !toAddressUnsatisfied;
    useEffect(() => {
        emitter.emit(WidgetEvent.WidgetExpanded, expanded);
    }, [emitter, expanded]);
    return (_jsx(Collapse, { timeout: timeout.enter, in: expanded, orientation: "horizontal", onExited: onExit, children: _jsx(Grow, { timeout: timeout.enter, in: expanded, mountOnEnter: true, unmountOnExit: true, children: _jsx(Container, { enableColorScheme: true, children: _jsxs(ScrollableContainer, { children: [_jsxs(Header, { children: [_jsx(Typography, { fontSize: 18, fontWeight: "700", flex: 1, noWrap: true, children: subvariant === 'custom'
                                        ? t('main.fromAmount')
                                        : t('header.youGet') }), _jsx(ProgressToNextUpdate, { updatedAt: dataUpdatedAt || new Date().getTime(), timeToUpdate: refetchTime, isLoading: isFetching, onClick: () => refetch(), sx: { marginRight: -1 } })] }), _jsx(PageContainer, { children: _jsx(Stack, { direction: "column", spacing: 2, flex: 1, paddingBottom: 3, children: routeNotFound ? (_jsx(RouteNotFoundCard, {})) : isLoading || (isFetching && !routesRef.current?.length) ? (Array.from({ length: 3 }).map((_, index) => (_jsx(RouteCardSkeleton, {}, index)))) : (routesRef.current?.map((route, index) => (_jsx(RouteCard, { route: route, onClick: allowInteraction
                                        ? () => handleRouteClick(route)
                                        : undefined, active: index === 0, expanded: routesRef.current?.length === 1 }, index)))) }) })] }) }) }) }));
};
//# sourceMappingURL=RoutesExpanded.js.map