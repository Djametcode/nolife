import { configureStore, createSlice } from "@reduxjs/toolkit";

const authState = {
  isLogin: false,
  isToggle: false,
  isLike: false,
  isSucess: false,
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
    toggleSucces(state) {
      state.isSucess = !state.isSucess;
    },
    closeToggle(state) {
      state.isSucess = !state.isSucess;
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
