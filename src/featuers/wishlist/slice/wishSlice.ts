import { WishlistItem } from './../types/type';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type wishlistinitList = {
    status: string,
    count: number,
    data: WishlistItem[],
}
let initialState:wishlistinitList = {
    status: '',
    count: 0,
    data: [],
}


let wishSlice = createSlice({
    name: 'wishlist',
    initialState: initialState,
    reducers: {
        setWishCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
    }
});

export const wishReducer = wishSlice.reducer;
export const wishActions = wishSlice.actions;