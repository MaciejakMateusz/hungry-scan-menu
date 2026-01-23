import {useTranslation} from "react-i18next";
import type {RefObject} from "react";

type FilteringFormType = {
    searchSubmit: any;
    value: string;
    inputRef: RefObject<HTMLInputElement | null>;
}

export const FilteringForm = (props: FilteringFormType) => {
    const {t} = useTranslation();
    return (
        <form className={'search-button-form'} onSubmit={props.searchSubmit}>
            <input type={'text'}
                   ref={props.inputRef}
                   className={'search-button-input'}
                   placeholder={t('search')}
                   name={'filter'}
                   value={props.value}
                   onChange={props.searchSubmit}/>
        </form>
    );
}