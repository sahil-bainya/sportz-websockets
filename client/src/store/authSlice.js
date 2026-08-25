import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null, // { id, name, email } | null
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions; 
export default authSlice.reducer;
