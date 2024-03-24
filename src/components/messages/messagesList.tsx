import { ProgressSpinner } from "primereact/progressspinner";
import { useGetDialogMessagesQuery } from "../../state/services/message.service";
import { UserResponseType } from "../../state/services/user.service";
import MessageItem from "./messageItem";

export default function MessagesList({
  accessToken,
  toUser,
  fromUserUsername,
}: {
  accessToken: string;
  toUser: UserResponseType;
  fromUserUsername: string;
}) {
  const {
    data: messages,
    isLoading,
    isSuccess,
  } = useGetDialogMessagesQuery({ accessToken: accessToken, toUserId: toUser.userId });

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
      <ul className="flex flex-col gap-y-3">
        {messages.map((message) => (
          <MessageItem
            key={message.messageId}
            text={message.text}
            username={message.toUserId === toUser.userId ? fromUserUsername : toUser.username}
            date={message.createdAt}
            isRight={toUser.userId === message.toUserId}
          />
        ))}
      </ul>
    );
  }
}
