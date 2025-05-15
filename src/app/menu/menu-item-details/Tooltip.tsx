import Tippy from "@tippyjs/react";

type TooltipType = {
    children: any;
    content: string;
}

export const Tooltip = ({children, content}: TooltipType) => {
    return (
        <Tippy content={content}
               placement={"top"}
               delay={0}
               duration={0}
               className={'tooltip'}>
            <div>
                {children}
            </div>
        </Tippy>
    );
};