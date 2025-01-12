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

    calculateRelevance: builder.mutation({
      query: ({ userInput, expertAnswer }) => ({
        url: `/webapis/storylining/calculate-relevance`,
        method: "POST",
        body: { userInput, expertAnswer },
      }),
    }),
  }),
});

export const {
  useGetSLAllContentQuery,
  useGetSLSingleContentQuery,
  useCalculateRelevanceMutation,
} = storyLiningApi;
