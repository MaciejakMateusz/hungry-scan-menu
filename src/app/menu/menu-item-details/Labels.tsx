import {useSelector} from "react-redux";
import {getTranslation} from "../../../locales/langUtils";
import {ReactSVG} from "react-svg";
import type {Label} from "../../../interfaces/Label.ts";
import {Tooltip} from "./Tooltip.tsx";

export const Labels = () => {
    const {menuItem} = useSelector<any, any>(state => state.main.view);

    if (menuItem?.labels === 0) {
        return null;
    }

    return (
        <div className={'details-labels-container'}>
            {menuItem.labels.map((label: Label) => (
                <Tooltip content={getTranslation(label?.name)}
                         appendTo={document.getElementById(`label-${label?.id}`) || undefined}
                         key={label?.id}>
                    <div id={`label-${label?.id}`}>
                        <ReactSVG className={'details-label-icon'} src={`/theme/icons/${label?.iconName}`}/>
                    </div>
                </Tooltip>
            ))}
        </div>
    );
}