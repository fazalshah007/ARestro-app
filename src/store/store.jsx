import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@/store/AuthSlice/AuthSlice"
import productSlice from "@/store/ProductSlice/ProductSlice"

const store = configureStore({
    reducer:{
        AuthSlice,
        productSlice,
    }
});

export default store;