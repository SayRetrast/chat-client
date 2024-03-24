import debounce from "debounce";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import { SetURLSearchParams } from "react-router-dom";

interface FormInputs {
  search: string;
}

export default function SearchUsersForm({
  searchParams,
  setSearchParams,
}: {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}) {
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  });

  const searchOnSubmit = debounce((formData: FormInputs) => {
    searchParams.set("search", formData.search);
    setSearchParams(searchParams);
  }, 500);

  return (
    <form>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <InputText
            className="w-full"
            type="text"
            placeholder="Find an user to chat with"
            onChange={(e) => {
              field.onChange(e.target.value);
              handleSubmit(searchOnSubmit)();
            }}
            defaultValue={searchParams.get("search")?.toString()}
          />
        )}
      />
    </form>
  );
}
