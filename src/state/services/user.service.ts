import { rootApi } from "../rootApi";

export type UserResponseType = {
  userId: string;
  username: string;
  avatar: string | null;
};

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query<UserResponseType[], { accessToken: string; username: string }>({
      query: ({ accessToken, username }) => ({
        url: `users/search/${username}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    getUserById: builder.query<UserResponseType, { accessToken: string; userId: string }>({
      query: ({ accessToken, userId }) => ({
        url: `users/user/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useGetUserByIdQuery } = userApi;
