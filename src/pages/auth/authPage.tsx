import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";
import { jwtDecode } from "jwt-decode";
import { DecodedJwtType } from "../../types/decodedJwt.type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/slices/user.slice";
import { setAccessToken } from "../../state/slices/accessToken.slice";
import { useLoginMutation, useRegistrationMutation } from "../../state/services/auth.service";
import { AuthBodyType } from "../../types/auth.type";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { isFetchBaseQueryError } from "../../lib/utils";
import ErrorMessage from "../../components/errorMessage";

interface FormInputs {
  regUsername: string;
  regPassword: string;
  logUsername: string;
  logPassword: string;
}

export default function AuthPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [registration] = useRegistrationMutation();
  const [login, { error, isError }] = useLoginMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      logUsername: "",
      regUsername: "",
      logPassword: "",
      regPassword: "",
    },
  });

  const loginOnSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const authData: AuthBodyType = { username: formData.logUsername, password: formData.logPassword };
    const { accessToken } = await login(authData).unwrap();
    if (!accessToken) {
      throw new Error("Could not login to an account.");
    }
    dispatch(setAccessToken(accessToken));

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    dispatch(setUser({ id: userData.id, username: userData.username }));

    navigate("/");
  };

  const registrationOnSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const authData: AuthBodyType = { username: formData.regUsername, password: formData.regPassword };

    const { accessToken } = await registration(authData).unwrap();
    if (!accessToken) {
      throw new Error("Could not create an account.");
    }
    dispatch(setAccessToken(accessToken));

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    dispatch(setUser({ id: userData.id, username: userData.username }));

    navigate("/");
  };

  return (
    <TabView className="auth-card-container">
      <TabPanel header="Sign in">
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(loginOnSubmit)}>
          <div className="flex flex-col gap-y-1">
            <Controller
              name="logUsername"
              control={control}
              rules={{ required: "Username is required." }}
              render={({ field }) => (
                <>
                  <label htmlFor={field.name} className="w-fit">
                    Username
                  </label>
                  <InputText id={field.name} {...field} />
                  {errors.logUsername && <ErrorMessage>{errors.logUsername.message}</ErrorMessage>}
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Controller
              name="logPassword"
              control={control}
              rules={{ required: "Password is required." }}
              render={({ field }) => (
                <>
                  <label htmlFor={field.name} className="w-fit">
                    Password
                  </label>
                  <Password id={field.name} feedback={false} toggleMask {...field} />
                  {errors.logPassword && <ErrorMessage>{errors.logPassword.message}</ErrorMessage>}
                </>
              )}
            />
          </div>

          <Button type="submit" label="Sign in" />

          {isError && isFetchBaseQueryError(error) && error.status === 400 && (
            <ErrorMessage>Wrong username or password.</ErrorMessage>
          )}
        </form>
      </TabPanel>

      <TabPanel header="Sign up">
        <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(registrationOnSubmit)}>
          <div className="flex flex-col gap-y-1">
            <Controller
              name="regUsername"
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
                  {errors.regUsername && <ErrorMessage>{errors.regUsername.message}</ErrorMessage>}
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <Controller
              name="regPassword"
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
                  {errors.regPassword && <ErrorMessage>{errors.regPassword.message}</ErrorMessage>}
                </>
              )}
            />
          </div>

          <Button type="submit" label="Sign up" />
        </form>
      </TabPanel>
    </TabView>
  );
}
