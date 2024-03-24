import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../errorMessage";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { isFetchBaseQueryError } from "../../lib/utils";
import { AuthBodyType, useLoginMutation } from "../../state/services/auth.service";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setAccessToken } from "../../state/slices/accessToken.slice";
import { setUser } from "../../state/slices/user.slice";
import { DecodedJwtType } from "../../types/decodedJwt.type";
import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";
import { Button } from "primereact/button";

interface FormInputs {
  username: string;
  password: string;
}

export default function SignInForm({
  dispatch,
  navigate,
}: {
  dispatch: Dispatch<UnknownAction>;
  navigate: NavigateFunction;
}) {
  const [login, { error: logError, isError: isLogError }] = useLoginMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginOnSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const authData: AuthBodyType = { username: formData.username, password: formData.password };

      const { accessToken } = await login(authData).unwrap();
      dispatch(setAccessToken(accessToken));

      const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
      const userData = { id: decodedJwt.sub, username: decodedJwt.username };
      dispatch(setUser({ id: userData.id, username: userData.username }));

      navigate("/");
    } catch (error) {
      console.error("There was an error when trying to sign in.", error);
    }
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(loginOnSubmit)}>
      <div className="flex flex-col gap-y-1">
        <Controller
          name="username"
          control={control}
          rules={{ required: "Username is required." }}
          render={({ field }) => (
            <>
              <label htmlFor={field.name} className="w-fit">
                Username
              </label>
              <InputText id={field.name} {...field} />
              {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            </>
          )}
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required." }}
          render={({ field }) => (
            <>
              <label htmlFor={field.name} className="w-fit">
                Password
              </label>
              <Password id={field.name} feedback={false} toggleMask {...field} />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </>
          )}
        />
      </div>

      <Button type="submit" label="Sign in" />

      {isLogError && isFetchBaseQueryError(logError) && logError.status === 400 && (
        <ErrorMessage>Wrong username or password.</ErrorMessage>
      )}
    </form>
  );
}
