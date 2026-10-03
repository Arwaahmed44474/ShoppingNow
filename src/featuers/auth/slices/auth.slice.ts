import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    name: string,
    role: string,
    id?: string,
    email?:string
}

export type initialState = { isAuthenticated: boolean,   userInfo: null | User, emailToresetPass?:string }

let initialState: initialState = {
        isAuthenticated: false,
        userInfo: null,
        emailToresetPass:''
    }
const authSlice = createSlice({
    name: 'auth',

    // key = value >> could use one word
    initialState: initialState,

    reducers: {
        setAuthState: function (state, action) {
            console.log('actionnnn', action);
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userInfo = action.payload.userInfo;
        },
        logout: function (state) {
            state.isAuthenticated = false;
            state.userInfo = null;
        },
        setEmailToresetPass: (state, action: PayloadAction<{ emailToresetPass: string }>) => {
            state.emailToresetPass = action.payload.emailToresetPass;
        },
    }
});

// to call the slice in the store
export const authReducer = authSlice.reducer;

// to use state functions
export const authActions = authSlice.actions;


