import {type RefObject, useCallback} from "react";
import type {Category} from "../interfaces/Category.ts";

type HookProps = {
    navRef: RefObject<HTMLDivElement | null>;
    pillRefs: RefObject<Record<string, HTMLDivElement | null>>;
    chosenCategory: Category;
}

export const useScrollActiveIntoView = ({navRef, pillRefs, chosenCategory}: HookProps) => {
    return useCallback(() => {
        const nav = navRef.current;
        const activeId = chosenCategory?.id;
        if (!nav || !activeId) return;

        const pill = pillRefs.current[String(activeId)];
        if (!pill) return;

        const navRect = nav.getBoundingClientRect();
        const pillRect = pill.getBoundingClientRect();

        const PADDING = 16;

        const pillLeftInside = pillRect.left >= navRect.left + PADDING;
        const pillRightInside = pillRect.right <= navRect.right - PADDING;

        if (pillLeftInside && pillRightInside) return;

        const pillOffsetLeft = pill.offsetLeft;
        const pillCenter = pillOffsetLeft + pill.offsetWidth / 2;
        const target = pillCenter - nav.clientWidth / 2;

        nav.scrollTo({
            left: Math.max(0, target),
            behavior: "smooth",
        });
    }, [chosenCategory?.id, navRef, pillRefs]);
}