import { configureStore, createSlice } from "@reduxjs/toolkit";

const authState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state) {
      state.isLogin = !state.isLogin;
    },
    logOut(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const authAction = authSlice.actions;

export default store;
