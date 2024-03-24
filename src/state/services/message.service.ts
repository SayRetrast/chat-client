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
    // sendMessage: builder.mutation<MessageResponseType, {accessToken: string; toUserId: string}>({
    //   query: ({accessToken, toUserId}) => ({
    //     url: 'messages/'
    //   })
    // })
    getDialogMessages: builder.query<MessageResponseType[], { accessToken: string; toUserId: string }>({
      query: ({ accessToken, toUserId }) => ({
        url: `messages/dialog/${toUserId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useGetDialogMessagesQuery } = messageApi;
