import {useCallback, useEffect, useLayoutEffect, useRef} from "react";
import {SearchIcon} from "../icons/SearchIcon.js";
import {useSelector} from "react-redux";
import {
    filter,
    getMenu,
    setCategory,
    setFilterActive,
    setFilteredItems,
    setFilterExpanded,
    setFilterValue,
    setRestaurantDefaultLanguage,
    setRestaurantToken,
    setSupportedLanguages
} from "../../slices/mainSlice.ts";
import {getTranslation} from "../../locales/langUtils";
import {FilteringForm} from "./FilteringForm";
import {useTranslation} from "react-i18next";
import type {RootState} from "../../store/store.ts";
import type {Category} from "../../interfaces/Category.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {useParams} from "react-router-dom";
import i18n from "../../i18n.ts";
import {useScrollActiveIntoView} from "../../hooks/useScrollActiveIntoView.ts";

export const CategoriesNavigation = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {categories} = useSelector((state: RootState) => state.main.getMenu);
    const chosenCategory: any = useSelector((state: RootState) => state.main.view.category);
    const {filterExpanded, filterValue} = useSelector((state: RootState) => state.main.view);
    const {menu} = useSelector<any, any>((state: RootState) => state.main.getMenu);
    const {theme} = useParams();
    const navRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const pillRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const setPillRef = (id: string) => (el: HTMLDivElement | null) => {
        pillRefs.current[id] = el;
    };
    const scrollActiveIntoView = useScrollActiveIntoView({navRef, pillRefs, chosenCategory});

    useLayoutEffect(() => {
        scrollActiveIntoView();
    }, [scrollActiveIntoView, categories.length]);

    const fetchMenu = useCallback(async () => {
        const result = await dispatch(getMenu());
        if (getMenu.fulfilled.match(result)) {
            dispatch(setCategory(result.payload.categories.length > 0 ? result.payload.categories[0] : null));
            dispatch(setSupportedLanguages(result.payload.restaurant.supportedLanguages));
            dispatch(setRestaurantDefaultLanguage(result.payload.restaurant.language));
            dispatch(setRestaurantToken(result.payload.restaurant.token));
            await i18n.changeLanguage(result.payload.restaurant.language.toLowerCase());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!menu) fetchMenu();
    }, [fetchMenu, menu]);

    useEffect(() => {
        const slider = navRef.current;
        if (!slider) return;

        const handleDown = (e: PointerEvent) => {
            isDown.current = true;
            startX.current = e.pageX - slider.offsetLeft;
            scrollLeft.current = slider.scrollLeft;
        };

        const handleLeaveOrUp = () => {
            isDown.current = false;
        };

        const handleMove = (e: PointerEvent) => {
            if (!isDown.current) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = x - startX.current;
            slider.scrollLeft = scrollLeft.current - walk;
        };

        slider.addEventListener("pointerdown", handleDown);
        slider.addEventListener("pointerleave", handleLeaveOrUp);
        slider.addEventListener("pointerup", handleLeaveOrUp);
        slider.addEventListener("pointermove", handleMove);

        return () => {
            slider.removeEventListener("pointerdown", handleDown);
            slider.removeEventListener("pointerleave", handleLeaveOrUp);
            slider.removeEventListener("pointerup", handleLeaveOrUp);
            slider.removeEventListener("pointermove", handleMove);
        };
    }, []);

    useEffect(() => {
        if (filterExpanded) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }, [filterExpanded]);

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
                 ref={setPillRef(String(category.id))}
                 className={`nav-category ${category?.id === chosenCategory?.id ? 'active' : ''}`}
                 style={category?.id === chosenCategory?.id ? {background: theme ? theme : menu?.theme} : {}}
                 onClick={() => dispatch(setCategory(category))}>
                <span>{getTranslation(category?.name)}</span>
            </div>
        ));
    };

    return (
        <div className={'nav-container'} ref={navRef}>
            <div className={`search-button ${filterExpanded ? 'search-active' : ''}`}>
                <button className={`search-initial-circle ${filterExpanded ? 'circle-active' : ''}`}
                        onClick={() => dispatch(setFilterExpanded(!filterExpanded))}>
                    <SearchIcon/>
                </button>
                <div className={`search-form-container ${filterExpanded ? 'visible' : 'hidden'}`}>
                    <FilteringForm value={filterValue} searchSubmit={handleSearchSubmit} inputRef={inputRef}/>
                    {filterValue !== '' &&
                        <span className={'clear-filter-x'} onClick={() => dispatch(setFilterValue(''))}>x</span>}
                </div>
            </div>
            {renderCategoriesButtons()}
        </div>
    );
};