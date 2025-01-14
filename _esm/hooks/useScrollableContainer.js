import { useCallback, useLayoutEffect, useState } from 'react';
import { ElementId, createElementId } from '../utils/elements.js';
import { useDefaultElementId } from './useDefaultElementId.js';
export const getScrollableContainer = (elementId) => document.getElementById(createElementId(ElementId.ScrollableContainer, elementId));
export const useGetScrollableContainer = () => {
    const elementId = useDefaultElementId();
    const getContainer = useCallback(() => getScrollableContainer(elementId), [elementId]);
    return getContainer;
};
export const useScrollableContainer = (elementId) => {
    const [containerElement, setContainerElement] = useState(() => getScrollableContainer(elementId));
    useLayoutEffect(() => {
        if (!containerElement) {
            setContainerElement(getScrollableContainer(elementId));
        }
    }, [containerElement, elementId]);
    return containerElement;
};
export const useScrollableOverflowHidden = () => {
    const elementId = useDefaultElementId();
    useLayoutEffect(() => {
        const element = getScrollableContainer(elementId);
        if (element) {
            element.style.overflowY = 'hidden';
        }
        return () => {
            if (element) {
                element.style.overflowY = 'auto';
            }
        };
    }, [elementId]);
};
//# sourceMappingURL=useScrollableContainer.js.map