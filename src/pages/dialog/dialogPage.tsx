import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ProgressSpinner } from "primereact/progressspinner";
import MessagesList from "../../components/messages/messagesList";
import SendMessageForm from "../../components/forms/sendMessageForm";
import { useGetDialogByIdQuery } from "../../state/services/dialog.service";
import { io, Socket } from "socket.io-client";

export default function DialogPage() {
  const { dialogId } = useParams();

  const socket: Socket = io(import.meta.env.VITE_BASE_URL);

  const fromUser = useSelector((state: RootState) => state.user);
  const { accessToken } = useSelector((state: RootState) => state.accessToken);

  const {
    data: dialog,
    isLoading,
    isSuccess,
  } = useGetDialogByIdQuery({ accessToken: accessToken!, dialogId: dialogId! });

  return (
    <div className="flex h-[calc(100svh_-_46px_-_4rem)] flex-col gap-y-3">
      {isLoading && (
        <div className="flex w-full">
          <ProgressSpinner className="h-8 w-8" />
        </div>
      )}

      {isSuccess && (
        <div className="flex flex-col gap-y-4">
          <p className="text-center font-medium">
            Chatting with {fromUser.id === dialog.userOneId ? dialog.userTwo.username : dialog.userOne.username}
          </p>

          <MessagesList
            dialogId={dialogId!}
            accessToken={accessToken!}
            toUser={fromUser.id === dialog.userOneId ? dialog.userTwo : dialog.userOne}
            fromUserUsername={fromUser.username!}
            socket={socket}
          />
        </div>
      )}

      <SendMessageForm
        accessToken={accessToken!}
        dialogId={dialogId!}
        socket={socket}
        fromUserId={fromUser.id!}
        isLoading={isLoading}
      />
    </div>
  );
}
