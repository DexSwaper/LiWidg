export var ElementId;
(function (ElementId) {
    ElementId["AppExpandedContainer"] = "widget-app-expanded-container";
    ElementId["Header"] = "widget-header";
    ElementId["RelativeContainer"] = "widget-relative-container";
    ElementId["ScrollableContainer"] = "widget-scrollable-container";
})(ElementId || (ElementId = {}));
export const createElementId = (ElementId, elementId) => elementId ? `${ElementId}-${elementId}` : ElementId;
//# sourceMappingURL=elements.js.map