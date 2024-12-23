import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";

const storyLiningToolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSLAllContent: builder.query({
      query: (id) => ({
        url: `/webapis/storylining/${id}/contents`,
      }),
      providesTags: [TAGS.toolContent],
    }),

    getSLSingleContent: builder.query({
      query: (id) => ({
        url: `/webapis/storylining/content/${id}`,
      }),
    }),
  }),
});

export const { useGetSLAllContentQuery, useGetSLSingleContentQuery } =
  storyLiningToolsApi;
