import { baseApi } from "@/redux/api/baseApi";
import { TAGS } from "../tag";

const storyLiningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getToolContent: builder.query({
      query: (id) => ({
        url: `/webapis/storylining/${id}/contents`,
      }),
      providesTags: [TAGS.toolContent],
    }),
    // doCommnet: builder.mutation({
    //   query: (data) => ({
    //     url: `/blog-comments/create-blog-comment`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["comment"],
    // }),
    // updateCommnet: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/blog-comments/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["comment"],
    // }),
    // deleteCommnet: builder.mutation({
    //   query: (id) => ({
    //     url: `blog-comments/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["comment"],
    // }),
  }),
});

export const { useGetToolContentQuery } = storyLiningApi;
