import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery.js";

export const matchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Matches"],
  endpoints: (builder) => ({
    getMatches: builder.query({
      query: () => ({ url: "/matches", method: "GET" }),
      providesTags: ["Matches"],
    }),
    createMatch: builder.mutation({
      query: (matchData) => ({
        url: "/matches",
        method: "POST",
        data: matchData,
      }),
      invalidatesTags: ["Matches"], // list ko auto-refresh karega
    }),
  }),
});

export const { useGetMatchesQuery, useCreateMatchMutation } = matchesApi;