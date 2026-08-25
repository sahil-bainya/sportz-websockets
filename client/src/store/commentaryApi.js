import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery.js";

export const commentaryApi = createApi({
  reducerPath: "commentaryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Commentary"],
  endpoints: (builder) => ({
    getCommentary: builder.query({
      query: (matchId) => ({
        url: `/matches/${matchId}/commentary`,
        method: "GET",
      }),
      providesTags: (result, error, matchId) => [
        { type: "Commentary", id: matchId },
      ],
    }),
    addCommentary: builder.mutation({
      query: ({ matchId, ...body }) => ({
        url: `/matches/${matchId}/commentary`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: (result, error, { matchId }) => [
        { type: "Commentary", id: matchId },
      ],
    }),
  }),
});

export const { useGetCommentaryQuery, useAddCommentaryMutation } =
  commentaryApi;
