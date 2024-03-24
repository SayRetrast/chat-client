import { rootApi } from "../rootApi";

type AuthResponseType = {
  accessToken: string;
};

export type AuthBodyType = {
  username: string;
  password: string;
};

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<AuthResponseType, AuthBodyType>({
      query: (body) => ({
        url: "auth/registration/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),

    login: builder.mutation<AuthResponseType, AuthBodyType>({
      query: (body) => ({
        url: "auth/login/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),

    auth: builder.mutation<AuthResponseType, void>({
      query: () => ({
        url: "auth/",
        method: "PUT",
        credentials: "include",
      }),
    }),

    delete: builder.mutation<void, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: "auth/logout/",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useRegistrationMutation, useLoginMutation, useAuthMutation, useDeleteMutation } = authApi;
