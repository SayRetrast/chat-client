import { ProgressSpinner } from "primereact/progressspinner";
import { useGetDialogMessagesQuery } from "../../state/services/message.service";
import { UserResponseType } from "../../state/services/user.service";
import MessageItem from "./messageItem";
import { Socket } from "socket.io-client";
import { useEffect } from "react";

export default function MessagesList({
  accessToken,
  toUser,
  fromUserUsername,
  dialogId,
  socket,
}: {
  accessToken: string;
  toUser: UserResponseType;
  fromUserUsername: string;
  dialogId: string;
  socket: Socket;
}) {
  const {
    data: messages,
    isLoading,
    isSuccess,
    refetch,
  } = useGetDialogMessagesQuery({ accessToken: accessToken, dialogId: dialogId });

  useEffect(() => {
    socket?.on("message", refetch);
    return () => {
      socket?.off("message", refetch);
    };
  }, [socket, refetch]);

  if (isLoading) {
    return (
      <div className="flex w-full">
        <ProgressSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (isSuccess && messages.length === 0) {
    return (
      <div className="w-full">
        <p className="text-center text-lg font-bold">
          Write something in the field bellow to start chatting with {toUser.username}.
        </p>
      </div>
    );
  }

  if (isSuccess && messages.length > 0) {
    return (
      <ul className="flex max-h-[calc(100svh_-_60px_-_42px_-_64px)] flex-col gap-y-3 overflow-auto px-2">
        {messages.map((message) => (
          <MessageItem
            key={message.messageId}
            text={message.text}
            username={message.userId === toUser.userId ? toUser.username : fromUserUsername}
            date={message.createdAt}
            isRight={message.userId !== toUser.userId}
          />
        ))}
      </ul>
    );
  }
}
