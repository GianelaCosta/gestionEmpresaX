import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const user = { username: action.payload.username };
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user,
        isAuthenticated: true,
        error: null,
      };
    },
    loginFailure: (state, action) => {
      localStorage.removeItem("user");
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    },
    logoutSuccess(state) {
      localStorage.removeItem("user");
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    },
    logoutFailure(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess, logoutFailure } =
  authSlice.actions;

export default authSlice.reducer;
