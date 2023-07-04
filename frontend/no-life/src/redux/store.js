import { configureStore, createSlice } from "@reduxjs/toolkit";

const authState = {
  isLogin: false,
  isToggle: false,
  isLike: false,
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
    toggleNavMobile(state) {
      state.isToggle = !state.isToggle;
    },
    closeNavMobile(state) {
      state.isToggle = !state.isToggle;
    },
    likePost(state) {
      state.isLike = !state.isLike;
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
