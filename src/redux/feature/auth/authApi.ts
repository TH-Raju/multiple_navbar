import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-actor",
        method: "POST",
        body: userInfo,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logIn: builder.mutation({
      query: (userInfo) => ({
        url: "/webapis/auth/loginViaEmailAndPassword",
        method: "POST",
        headers: {
          email: userInfo.email,
          password: userInfo.password,
        },
      }),
    }),
    changedPassword: builder.mutation({
      query: (password) => ({
        url: "/auth/change-password",
        method: "POST",
        body: password,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (password) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: password,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, headers }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          ...headers,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useChangedPasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
