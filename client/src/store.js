import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user.js";
import transactionsReducer from "./feature/transaction.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
  },
});

export default store;
