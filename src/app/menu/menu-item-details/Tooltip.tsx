import {useState} from 'react';

type TooltipType = {
    children: any;
    content: string;
}

export const Tooltip = ({children, content}: TooltipType) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={'tooltip-wrapper'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {children}
            {isVisible && (
                <div
                    className={'tooltip-content'}>
                    {content}
                </div>
            )}
        </div>
    );
};