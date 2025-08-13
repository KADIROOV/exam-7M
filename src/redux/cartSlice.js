import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [] // { id, name, price, quantity }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.cartItems.find(i => i.id === item.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
                }
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
    }
});

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart
} = cartSlice.actions;
export default cartSlice.reducer;
