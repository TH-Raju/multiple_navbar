import { DataConstant } from "@/constants/data.constant";
import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "@/redux/tag";

const ToolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markContentAsCompleted: builder.mutation({
      query: (id) => ({
        url: `/webapis/tool/markToolContentAsCompleted`,
        method: "POST",
        body: { toolContentId: id },
      }),
      invalidatesTags: [TAGS.toolContent, TAGS.userProgress],
    }),

    getUserProgress: builder.query({
      query: () => ({
        // get user progress under the Kurated Storylining
        url: `/webapis/user/userProgress/${DataConstant.KURATED_STORYLINING_ID}`,
      }),
      providesTags: [TAGS.userProgress],
    }),
  }),
});

export const { useMarkContentAsCompletedMutation, useGetUserProgressQuery } =
  ToolsApi;
