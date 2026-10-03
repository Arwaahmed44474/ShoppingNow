import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartResponse, CartItem } from "../types/cartType";

export type cartInitType = {
    status: string,
        message: string,
        numOfCartItems: number,
        cartId: null | string,
        data: {
            products: CartItem[],
            totalCartPrice: number
    }
}
let initialState: cartInitType = {
    status: '',
    message: '',
    numOfCartItems: 0,
    cartId: null,
    data: {
        products: [],
        totalCartPrice: 0
    }
};

let cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCartInfo: (state, action: PayloadAction<AddToCartResponse>)=> {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.data = action.payload.data;
            state.numOfCartItems = action.payload.numOfCartItems;
            state.cartId = action.payload.cartId;
        },

        
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;