import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { adminApi } from "./adminApi.js";
import { matchesApi } from "./matchesApi.js";
import { commentaryApi } from "./commentaryApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
    [commentaryApi.reducerPath]: commentaryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      .concat(matchesApi.middleware)
      .concat(commentaryApi.middleware),
});

    