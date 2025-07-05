import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    isAuthUser: null,
    user: null
};

const AuthSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthUser = action.payload.isLoggedIn;
            
        },
        userDataFromServer: (state, action) => {
            state.isAuthUser = action.payload?.isLoggedIn
            state.user = {
                userID: action.payload?.user?.id,
                firstname: action.payload?.user?.firstname,
                lastname: action.payload?.user?.lastname,
                email: action.payload?.user?.email,
                role: action.payload?.user?.role,
                phone: action.payload?.user?.phone,
                address: action.payload?.user?.address
            };
        },
        logOutUser: (state) => {
            localStorage.clear()
            state.accessToken = null;
            state.isAuthUser = false;
            state.user = null;
        },
    }
});

export const { loginUser, userDataFromServer, logOutUser } = AuthSlice.actions;
export default AuthSlice.reducer;