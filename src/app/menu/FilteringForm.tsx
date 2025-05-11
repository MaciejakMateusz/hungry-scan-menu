import {useTranslation} from "react-i18next";

type FilteringFormType = {
    searchSubmit: any;
    value: string;
}

export const FilteringForm = (props: FilteringFormType) => {
    const {t} = useTranslation();
    return (
        <form className={'search-button-form'} onSubmit={props.searchSubmit}>
            <input type={'text'}
                   className={'search-button-input'}
                   placeholder={t('search')}
                   name={'filter'}
                   value={props.value}
                   onChange={props.searchSubmit}/>
        </form>
    );
}