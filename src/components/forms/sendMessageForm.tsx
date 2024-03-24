import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSendMessageMutation } from "../../state/services/message.service";

interface FormInputs {
  text: string;
}

export default function SendMessageForm({
  isLoading,
  accessToken,
  toUserId,
}: {
  isLoading: boolean;
  accessToken: string;
  toUserId: string;
}) {
  const [sendMutation] = useSendMessageMutation();

  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      text: "",
    },
  });

  const sendMessageOnSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      sendMutation({ accessToken: accessToken, toUserId: toUserId, text: formData.text });
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
