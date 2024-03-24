import { rootApi } from "../rootApi";
import { UserResponseType } from "./user.service";

type DialogResponseType = {
  dialogId: string;
  userOneId: string;
  userTwoId: string;
  userOne: UserResponseType;
  userTwo: UserResponseType;
  createdAt: string;
  updatedAt: string;
};

export const dialogApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createDialog: builder.mutation<DialogResponseType, { accessToken: string; userId: string }>({
      query: ({ accessToken, userId }) => ({
        url: `dialogs/dialog/${userId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Dialog"],
    }),

    getUserDialogs: builder.query<DialogResponseType[], { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: `dialogs/user`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["Dialog"],
    }),
  }),
});

export const { useCreateDialogMutation, useGetUserDialogsQuery } = dialogApi;
