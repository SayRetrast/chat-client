import { rootApi } from "../rootApi";

type MessageResponseType = {
  messageId: string;
  text: string;
  fromUserId: string;
  toUserId: string;
  createdAt: string;
  updatedAt: string;
};

export const messageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<MessageResponseType, { accessToken: string; toUserId: string; text: string }>({
      query: ({ accessToken, toUserId, text }) => ({
        url: `messages/${toUserId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { text: text },
      }),
      invalidatesTags: ["Message"],
    }),

    getDialogMessages: builder.query<MessageResponseType[], { accessToken: string; toUserId: string }>({
      query: ({ accessToken, toUserId }) => ({
        url: `messages/dialog/${toUserId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["Message"],
    }),
  }),
});

export const { useGetDialogMessagesQuery, useSendMessageMutation } = messageApi;
