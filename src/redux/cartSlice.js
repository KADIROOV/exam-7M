import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const product = state.cartItems.find(i => i.id === item.id); // bu yerda  find arra metodidan gpt  yordamida  foydalanganman!!!
            if (product) {
                product.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        inc: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        dec: (state, action) => {
            const item = state.cartItems.find(i => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
                }
            }
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
});

export const {
    addToCart,
    inc,
    dec,
    removeCart,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
