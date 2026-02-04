import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const filter = createAsyncThunk<void, any>(
    'filtering/filter',
    async (params: any, {rejectWithValue}) => {
        const path = params.path;
        const value = params.value;
        const response = await fetch(`${apiHost}/api/cms/${path}/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: value
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return rejectWithValue(errorData);
        }

        return await response.json().catch(() => {});
    }
);

type FilteringSliceType = {
    isPending: boolean;
}

const initialFilteringState: FilteringSliceType = {
    isPending: false,
}

export const filteringSlice = createSlice(
    {
        name: 'filter',
        initialState: initialFilteringState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(filter.pending, state => {
                    state.isPending = true;
                })
                .addCase(filter.fulfilled, state => {
                    state.isPending = false;
                })
                .addCase(filter.rejected, state => {
                    state.isPending = false;
                })
        }
    });

export const getMenu = createAsyncThunk(
    'getMenu/getMenu',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json().catch(() => {});
    }
);

export const getMenuSlice = createSlice({
    name: 'getMenu',
    initialState: {
        menu: null,
        categories: [],
        isLoading: false
    },
    reducers: {
      setIsLoading: (state, action) => {
          state.isLoading = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, state => {
                state.isLoading = true;
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.menu = action.payload;
                state.categories = action.payload.categories;
                state.isLoading = false;
            })
            .addCase(getMenu.rejected, state => {
                state.isLoading = false;
            })
    }
});

export const mainSlice = createSlice(
    {
        name: 'view',
        initialState: {
            category: null,
            menuItem: null,
            supportedLanguages: [],
            restaurantDefaultLanguage: 'PL',
            restaurantToken: '',
            filterActive: false,
            filterValue: '',
            filteredItems: null,
            filterExpanded: false
        },
        reducers: {
            setCategory: (state, action) => {
                state.category = action.payload;
                state.filterExpanded = false;
                state.filteredItems = null;
                state.filterValue = '';
                state.filterActive = false;
            },
            setMenuItem: (state, action) => {
                state.menuItem = action.payload;
            },
            setSupportedLanguages: (state, action) => {
                state.supportedLanguages = action.payload;
            },
            setRestaurantDefaultLanguage: (state, action) => {
                state.restaurantDefaultLanguage = action.payload;
            },
            setRestaurantToken: (state, action) => {
                state.restaurantToken = action.payload;
            },
            setFilterActive: (state, action) => {
                state.filterActive = action.payload;
            },
            setFilterValue: (state, action) => {
                state.filterValue = action.payload;
                if(state.filterValue === '') {
                    state.filterActive = false;
                }
            },
            setFilteredItems: (state, action) => {
                state.filteredItems = action.payload;
            },
            setFilterExpanded: (state, action) => {
                state.filterExpanded = action.payload;
                state.filteredItems = null;
                state.filterValue = '';
                state.filterActive = false;
            }
        }
    });

export const {
    setCategory,
    setMenuItem,
    setSupportedLanguages,
    setRestaurantDefaultLanguage,
    setRestaurantToken,
    setFilterActive,
    setFilterValue,
    setFilteredItems,
    setFilterExpanded
} = mainSlice.actions;

const mainReducer = combineReducers({
    view: mainSlice.reducer,
    getMenu: getMenuSlice.reducer,
    filter: filteringSlice.reducer
});

export default mainReducer;