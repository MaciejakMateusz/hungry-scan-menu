import {useSelector} from "react-redux";
import {Tooltip} from "./Tooltip";
import {getTranslation} from "../../../locales/langUtils";
import {ReactSVG} from "react-svg";
import type {Label} from "../../../interfaces/Label.ts";

export const Labels = () => {
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);

    if (menuItem?.labels === 0) {
        return (<></>);
    }

    return (
        <div className={'details-labels-container'}>
            {menuItem.labels.map((label: Label) => (
                <Tooltip content={getTranslation(label?.name)}
                         key={label?.id}>
                    <ReactSVG className={'details-label-icon'}
                              src={`/theme/icons/${label?.iconName}`}
                    />
                </Tooltip>
            ))}
        </div>
    );
}