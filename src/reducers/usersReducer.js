import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    fetchUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      const newUser = action.payload;
      state.users = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { fetchUsers, addUser } = usersSlice.actions;

export default usersSlice.reducer;
