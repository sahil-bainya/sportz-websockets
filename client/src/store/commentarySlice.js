import { createSlice } from "@reduxjs/toolkit";

const commentarySlice = createSlice({
  name: "liveCommentary",
  initialState: {
    byMatchId: {}, // { 1: [comment1, comment2], 2: [...] }
  },
  reducers: {
    addLiveCommentary: (state, action) => {
      const comment = action.payload;
      const matchId = comment.matchId;
      if (!state.byMatchId[matchId]) {
        state.byMatchId[matchId] = [];
      }
      state.byMatchId[matchId].unshift(comment); // naya comment upar
    },
    setInitialCommentary: (state, action) => {
      const { matchId, comments } = action.payload;
      state.byMatchId[matchId] = comments;
    },
  },
});

export const { addLiveCommentary, setInitialCommentary } = commentarySlice.actions;
export default commentarySlice.reducer;