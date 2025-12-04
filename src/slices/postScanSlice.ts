import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getCookie} from "../utils";

export const executePostScanActions = createAsyncThunk(
    'postScan/execute',
    async (_, {rejectWithValue}) => {
        let footprint = getCookie('footprint');
        if(!footprint) {
            const uuid = crypto.randomUUID();
            const restaurantToken = getCookie('restaurantToken');
            footprint = restaurantToken + uuid
        }
        const response = await fetch(`${apiHost}/api/users/post-scan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: footprint
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getOperatingHours = createAsyncThunk(
    'getOperatingHours/getOperatingHours',
    async (token: string | undefined, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/restaurants/operating-hours/${token}`, {
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

export const getOperatingHoursSlice = createSlice({
    name: 'getOperatingHours',
    initialState: {
        operatingHours: null,
        isLoading: false
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOperatingHours.pending, state => {
                state.isLoading = true;
            })
            .addCase(getOperatingHours.fulfilled, (state, action) => {
                state.operatingHours = action.payload;
                state.isLoading = false;
            })
            .addCase(getOperatingHours.rejected, state => {
                state.isLoading = false;
            })
    }
});

const postScanReducer = combineReducers({
    operatingHours: getOperatingHoursSlice.reducer
});

export default postScanReducer;