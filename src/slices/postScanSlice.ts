import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getCookie, setCookie, uuidV4} from "../utils";

export const executePostScanActions = createAsyncThunk(
    'postScan/execute',
    async (restaurantToken: string, {rejectWithValue}) => {
        const visitorId = setVisitorIdCookie(restaurantToken);
        const response = await fetch(`${apiHost}/api/qr/post-scan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: visitorId
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

const setVisitorIdCookie = (restaurantToken: string): string => {
    let visitorId = getCookie('visitorId');
    if (!visitorId) {
        const uuid = uuidV4();
        visitorId = restaurantToken + '_' + uuid;
        const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
        const isSecure = import.meta.env.VITE_APP_IS_PRODUCTION === 'true';
        setCookie('visitorId', visitorId, {secure: isSecure, maxAge: ONE_YEAR_SECONDS})
    }
    return visitorId;
}

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

        return await response.json().catch((err) => {
            console.log(err.message);
        });
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