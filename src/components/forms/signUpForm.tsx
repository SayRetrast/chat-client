import { UnknownAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dispatch } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { isFetchBaseQueryError } from "../../lib/utils";
import { useRegistrationMutation, AuthBodyType } from "../../state/services/auth.service";
import { setAccessToken } from "../../state/slices/accessToken.slice";
import { setUser } from "../../state/slices/user.slice";
import { DecodedJwtType } from "../../types/decodedJwt.type";
import ErrorMessage from "../errorMessage";

interface FormInputs {
  username: string;
  password: string;
}

export default function SignUpForm({
  dispatch,
  navigate,
}: {
  dispatch: Dispatch<UnknownAction>;
  navigate: NavigateFunction;
}) {
  const [registration, { error: regError, isError: isRegError }] = useRegistrationMutation();

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

  const registrationOnSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const authData: AuthBodyType = { username: formData.username, password: formData.password };

      const { accessToken } = await registration(authData).unwrap();
      dispatch(setAccessToken(accessToken));

      const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
      const userData = { id: decodedJwt.sub, username: decodedJwt.username };
      dispatch(setUser({ id: userData.id, username: userData.username }));

      navigate("/");
    } catch (error) {
      console.error("There was an error when trying to sign up.", error);
    }
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(registrationOnSubmit)}>
      <div className="flex flex-col gap-y-1">
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Username is required.",
            maxLength: { value: 50, message: "Username must be fewer than 50 characters long." },
          }}
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
          rules={{
            required: "Password is required.",
            minLength: { value: 6, message: "Password must be at least 6 characters long" },
            maxLength: { value: 50, message: "Password must be fewer than 50 characters long." },
          }}
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

      <Button type="submit" label="Sign up" />

      {isRegError && isFetchBaseQueryError(regError) && regError.status === 422 && (
        <ErrorMessage>Such username is already taken.</ErrorMessage>
      )}
    </form>
  );
}
