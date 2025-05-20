import {useCallback, useEffect} from "react";
import {SearchIcon} from "../icons/SearchIcon.js";
import {useSelector} from "react-redux";
import {
    filter,
    getMenu,
    setCategory,
    setFilterActive,
    setFilteredItems,
    setFilterExpanded,
    setFilterValue
} from "../../slices/mainSlice.ts";
import {getTranslation} from "../../locales/langUtils";
import {FilteringForm} from "./FilteringForm";
import {useTranslation} from "react-i18next";
import {LoadingSpinner} from "../icons/LoadingSpinner.js";
import type {RootState} from "../../store/store.ts";
import type {Category} from "../../interfaces/Category.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";

export const CategoriesNavigation = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {categories} = useSelector((state: RootState) => state.main.getMenu);
    const chosenCategory: any = useSelector((state: RootState) => state.main.view.category);
    const {filterExpanded, filterValue} = useSelector((state: RootState) => state.main.view);
    const {isPending} = useSelector((state: RootState) => state.main.filter);
    const {isLoading, menu} = useSelector<any, any>((state: RootState) => state.main.getMenu);

    const fetchCategories = useCallback(async () => {
        const result = await dispatch(getMenu());
        if (getMenu.fulfilled.match(result) && !chosenCategory) {
            dispatch(
                setCategory(result.payload.categories.length > 0 ? result.payload.categories[0] : null)
            );
        }
    }, [dispatch, chosenCategory]);

    useEffect(() => {
        if(categories.length === 0) fetchCategories();
    }, [categories, fetchCategories]);

    const handleSearchSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(setFilterValue(e.target.value));
        await executeFilter(e.target.value);
    };

    const executeFilter = async (value: string) => {
        if ('' !== value) {
            dispatch(setFilterActive(true));
            const resultAction = await dispatch(filter({path: 'items', value: value}));
            if (filter.fulfilled.match(resultAction)) {
                dispatch(setFilteredItems(resultAction.payload));
            }
        } else {
            dispatch(setFilterActive(false));
            dispatch(setFilteredItems(null));
        }
    };

    const renderCategoriesButtons = () => {
        if (categories.length === 0) {
            return (
                <div className={'nav-category'}>
                    <span>{t('noCategories')}</span>
                </div>
            );
        }
        return categories.map((category: Category) => (
            <div key={category.id}
                 className={`nav-category ${category?.id === chosenCategory?.id ? 'active' : ''}`}
                 style={category?.id === chosenCategory?.id ? {background: menu?.theme} : {}}
                 onClick={() => dispatch(setCategory(category))}>
                <span>{getTranslation(category?.name)}</span>
            </div>
        ));
    };

    return (
        <div className={'nav-container'}>
            <div className={`search-button ${filterExpanded ? 'search-active' : ''}`}>
                <button className={`search-initial-circle ${filterExpanded ? 'circle-active' : ''}`}
                        onClick={() => dispatch(setFilterExpanded(!filterExpanded))}>
                    <SearchIcon/>
                </button>
                <div className={`search-form-container ${filterExpanded ? 'visible' : 'hidden'}`}>
                    <FilteringForm value={filterValue} searchSubmit={handleSearchSubmit}/>
                    {filterValue !== '' &&
                        <span className={'clear-filter-x'} onClick={() => dispatch(setFilterValue(''))}>x</span>}
                </div>
            </div>
            {(isLoading || isPending) && <LoadingSpinner/>}
            {renderCategoriesButtons()}
        </div>
    );
};