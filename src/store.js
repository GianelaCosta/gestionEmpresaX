import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import requestsReducer from "./reducers/requestsReducer";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestsReducer,
    products: productsReducer,
    users: usersReducer,
  },
});

export default store;
