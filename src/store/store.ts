import {combineReducers, configureStore} from "@reduxjs/toolkit";
import mainReducer from "../slices/mainSlice.ts";
import statisticsReducer from "../slices/statisticsSlice";

const rootReducer = combineReducers({
    main: mainReducer,
    statistics: statisticsReducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;