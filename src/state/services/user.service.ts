import { rootApi } from "../rootApi";

type UserResponseType = {
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
  }),
});

export const { useSearchUsersQuery } = userApi;
