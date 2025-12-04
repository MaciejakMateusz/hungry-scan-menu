import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainReducer from "../slices/mainSlice.ts";
import statisticsReducer from "../slices/statisticsSlice";
import postScanReducer from "../slices/postScanSlice.ts";

const rootReducer = combineReducers({
    main: mainReducer,
    postScan: postScanReducer,
    statistics: statisticsReducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;