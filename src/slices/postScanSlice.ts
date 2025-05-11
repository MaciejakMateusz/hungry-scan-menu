import {createAsyncThunk} from "@reduxjs/toolkit";
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