import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthBodyType } from "../../types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL + "/auth" }),
  endpoints: (builder) => ({
    registration: builder.mutation<{ accessToken: string }, AuthBodyType>({
      query: (body) => ({
        url: "/registration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        credentials: "include",
      }),
    }),

    login: builder.mutation<{ accessToken: string }, AuthBodyType>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        credentials: "include",
      }),
    }),

    auth: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),

    delete: builder.mutation<void, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: "/logout",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useAuthMutation, useDeleteMutation } = authApi;
