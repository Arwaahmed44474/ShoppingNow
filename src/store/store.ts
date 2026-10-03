import { wishlistinitList, wishReducer } from './../featuers/wishlist/slice/wishSlice';
import { authReducer, initialState } from "@/featuers/auth/slices/auth.slice";
import { cartInitType, cartReducer } from "@/featuers/cart/slice/cartSlice";
import { configureStore } from "@reduxjs/toolkit";


export type preloadedState = {
    authReducer: initialState,
    cartReducer: cartInitType,
    wishReducer: wishlistinitList
}

export function creatStore(preloadedState: preloadedState) {
    const myStore = configureStore({
    reducer: {
        authReducer,
        cartReducer,
        wishReducer
    },
    preloadedState
    });
    
    return myStore
}




// myStore.getState : return all states in the store
export type storeType = ReturnType<typeof creatStore>;
export type storeStateType = ReturnType<storeType['getState']>;
