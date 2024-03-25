import { rootApi } from "../rootApi";

type MessageResponseType = {
  messageId: number;
  text: string;
  dialogId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const messageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<MessageResponseType, { accessToken: string; dialogId: string; text: string }>({
      query: ({ accessToken, dialogId, text }) => ({
        url: `messages/message/${dialogId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { text: text },
      }),
      invalidatesTags: ["Message"],
    }),

    getDialogMessages: builder.query<MessageResponseType[], { accessToken: string; dialogId: string }>({
      query: ({ accessToken, dialogId }) => ({
        url: `messages/dialog/${dialogId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ["Message"],
    }),
  }),
});

export const { useGetDialogMessagesQuery, useSendMessageMutation } = messageApi;
