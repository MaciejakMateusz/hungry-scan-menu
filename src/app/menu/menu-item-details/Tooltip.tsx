import Tippy from "@tippyjs/react";
import type {ReactNode} from "react";

type TooltipType = {
    children: any;
    content: string | ReactNode;
    appendTo?: HTMLElement | undefined;
}

export const Tooltip = ({children, content, appendTo}: TooltipType) => {
    return (
        <Tippy content={content}
               placement={"auto"}
               delay={0}
               duration={0}
               className={'tooltip'}
               appendTo={appendTo}>
            {children}
        </Tippy>
    );
};