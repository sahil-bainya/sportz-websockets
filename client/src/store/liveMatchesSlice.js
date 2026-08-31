
import { createSlice } from "@reduxjs/toolkit";

const liveMatchesSlice = createSlice({
  name: "liveMatches",
  initialState: {
    matches: [],   // saare matches jo REST se aaye the, WebSocket se naye add honge
  },
  reducers: {
    setInitialMatches: (state, action) => {
      state.matches = action.payload;
    },
    addLiveMatch: (state, action) => {
      state.matches.unshift(action.payload); // naya match upar add karo
    },
  },
});

export const { setInitialMatches, addLiveMatch } = liveMatchesSlice.actions;
export default liveMatchesSlice.reducer;