import { cartStorDataSetItem } from "@/utils/CartStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: null,
    products: null,
    cartItem: JSON.parse(localStorage.getItem("cart")) || [],
    updateComponent: 0
};

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchedAllProducts: (state, action) => {
            state.category = [...new Set(action.payload?.map(item => item.category))]
            state.products = action.payload;
        },
        categoryWiseProducts: (state, action) => {
            state.products = action.payload
        },
        addToCart: (state, action) => {
            const newItem = action.payload;

            const existItem = state.cartItem?.find(item => (
                item?._id === newItem._id
                && JSON.stringify(item?.selectedSize) === JSON.stringify(newItem.selectedSize)
                && JSON.stringify(item?.selectedToppings) === JSON.stringify(newItem.selectedToppings)
            ))


            if (existItem) {
                existItem.quantity += newItem.quantity
            } else {
                state.cartItem.push(newItem)
            }

            cartStorDataSetItem(state.cartItem)
        },
        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cartItem.find(item => item._id === itemId);
            if (item && item.quantity < 5) {
                item.quantity += 1;
            }
            cartStorDataSetItem(state.cartItem);
        },

        decrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cartItem.find(item => item._id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            cartStorDataSetItem(state.cartItem);
        },
        clearCartItem: (state) => {
            state.cartItem = []
        },
        reRenderComponent: (state) => {
            state.updateComponent = state.updateComponent + 1
        }
    }
});

export const {
    fetchedAllProducts,
    categoryWiseProducts,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    clearCartItem,
    reRenderComponent
} = ProductSlice.actions;
export default ProductSlice.reducer;