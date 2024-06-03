export declare enum ElementId {
    AppExpandedContainer = "widget-app-expanded-container",
    Header = "widget-header",
    RelativeContainer = "widget-relative-container",
    ScrollableContainer = "widget-scrollable-container"
}
export declare const createElementId: (ElementId: ElementId, elementId: string) => string;
