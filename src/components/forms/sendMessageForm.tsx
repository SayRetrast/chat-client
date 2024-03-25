import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Socket } from "socket.io-client";

interface FormInputs {
  text: string;
}

export default function SendMessageForm({
  accessToken,
  dialogId,
  isLoading,
  socket,
  fromUserId,
}: {
  accessToken: string;
  dialogId: string;
  isLoading: boolean;
  socket: Socket;
  fromUserId: string;
}) {
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      text: "",
    },
  });

  const sendMessageOnSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      socket.emit("message", { accessToken: accessToken, text: formData.text, dialogId: dialogId, userId: fromUserId });
    } catch (error) {
      console.error("There was an error when trying to send a message.", error);
    }
  };

  return (
    <form className="mt-auto grid grid-cols-[1fr_31.5px] gap-x-2" onSubmit={handleSubmit(sendMessageOnSubmit)}>
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <InputText {...field} type="text" placeholder="Type your message here" disabled={isLoading} />
            <Button type="submit" icon="pi pi-send" disabled={!field.value.trim()} />
          </>
        )}
      />
    </form>
  );
}
