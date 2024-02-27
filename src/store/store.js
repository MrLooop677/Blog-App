import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/post-slice";
export const store = configureStore({
    reducer: {
        postSlice
    }
})