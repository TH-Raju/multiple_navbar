import { baseApi } from "@/redux/api/baseApi";

const storyLiningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSLAllContent: builder.query({
      query: (id) => ({
        url: `/webapis/storylining/${id}/contents`,
      }),
      // providesTags: [TAGS.toolContent],
    }),

    getSLSingleContent: builder.query({
      query: (id) => ({
        url: `/webapis/storylining/content/${id}`,
      }),
    }),
  }),
});

export const { useGetSLAllContentQuery, useGetSLSingleContentQuery } =
  storyLiningApi;
