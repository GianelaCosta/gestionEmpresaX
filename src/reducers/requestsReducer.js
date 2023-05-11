import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
  },
  reducers: {
    fetchRequests(state, action) {
      state.requests = action.payload;
    },
    updateRequests(state, action) {
      state.requests = action.payload;
      localStorage.setItem("requests", JSON.stringify(state.requests));
    },
  },
});

export const { fetchRequests, updateRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
