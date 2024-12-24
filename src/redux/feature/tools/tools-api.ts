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
      invalidatesTags: [TAGS.toolContent],
    }),
  }),
});

export const { useMarkContentAsCompletedMutation } = ToolsApi;
