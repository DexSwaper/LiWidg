import type { Connector } from 'wagmi';
interface EVMListItemButtonProps {
    connectedConnector?: Connector;
    connector: Connector;
    onNotInstalled(connector: Connector): void;
}
export declare const EVMListItemButton: ({ connectedConnector, connector, onNotInstalled, }: EVMListItemButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
