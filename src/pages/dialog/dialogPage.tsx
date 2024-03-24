import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../state/services/user.service";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ProgressSpinner } from "primereact/progressspinner";
import MessagesList from "../../components/messages/messagesList";
import SendMessageForm from "../../components/forms/sendMessageForm";

export default function DialogPage() {
  const { userId } = useParams();

  const fromUser = useSelector((state: RootState) => state.user);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);

  const { data: user, isLoading, isSuccess } = useGetUserByIdQuery({ accessToken: accessToken!, userId: userId! });

  return (
    <div className="flex h-[calc(100svh_-_46px_-_4rem)] flex-col gap-y-3">
      {isLoading && (
        <div className="flex w-full">
          <ProgressSpinner className="h-8 w-8" />
        </div>
      )}

      {isSuccess && <MessagesList accessToken={accessToken!} toUser={user} fromUserUsername={fromUser.username!} />}

      <SendMessageForm accessToken={accessToken!} toUserId={userId!} isLoading={isLoading} />
    </div>
  );
}
