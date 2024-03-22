import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";

import { jwtDecode } from "jwt-decode";
import { DecodedJwtType } from "../../types/decodedJwt.type";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../../state/slices/user.slice";
import { setAccessToken } from "../../state/slices/accessToken.slice";
import { useState } from "react";
import { useLoginMutation, useRegistrationMutation } from "../../state/services/auth.service";
import { AuthBodyType } from "../../types/auth.type";

function PasswordFooter() {
  return (
    <div>
      <Divider />

      <h2>Protection</h2>

      <ul className="mt-4 flex flex-col gap-y-1">
        <li className="flex items-center gap-x-1">
          <i className="pi pi-check"></i>
          <p>At least 8 characters long</p>
        </li>

        <li className="flex items-center gap-x-1">
          <i className="pi pi-check"></i>
          <p>At least one uppercase</p>
        </li>

        <li className="flex items-center gap-x-1">
          <i className="pi pi-check"></i>
          <p>At least one lowercase</p>
        </li>

        <li className="flex items-center gap-x-1">
          <i className="pi pi-check"></i>
          <p>At least one digit</p>
        </li>
      </ul>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [registration] = useRegistrationMutation();
  const [login] = useLoginMutation();

  const [formData, setFormData] = useState<AuthBodyType>({ username: "", password: "" });

  async function registrationHandler() {
    const { accessToken } = await registration(formData).unwrap();
    if (!accessToken) {
      throw new Error("Could not create an account.");
    }
    dispatch(setAccessToken(accessToken));

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    dispatch(setUser({ id: userData.id, username: userData.username }));

    navigate("/");
  }

  async function loginHandler() {
    const { accessToken } = await login(formData).unwrap();
    if (!accessToken) {
      throw new Error("Could not login to an account.");
    }
    dispatch(setAccessToken(accessToken));

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    dispatch(setUser({ id: userData.id, username: userData.username }));

    navigate("/");
  }

  return (
    <TabView className="auth-card-container">
      <TabPanel header="Sign in">
        <form className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username">Username</label>
            <InputText
              className="w-full"
              id="username"
              onChange={(e) => setFormData({ username: e.target.value, password: formData.password })}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Password</label>
            <Password
              className="block"
              inputId="password"
              feedback={false}
              toggleMask
              onChange={(e) => setFormData({ username: formData.username, password: e.target.value })}
            />
          </div>

          <Button type="button" label="Sign in" onClick={loginHandler} />
        </form>
      </TabPanel>

      <TabPanel header="Sign up">
        <form className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username">Username</label>
            <InputText
              className="w-full"
              id="username"
              onChange={(e) => setFormData({ username: e.target.value, password: formData.password })}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Password</label>
            <Password
              className="block"
              inputId="password"
              footer={PasswordFooter}
              toggleMask
              onChange={(e) => setFormData({ username: formData.username, password: e.target.value })}
            />
          </div>

          <Button type="button" label="Sign up" onClick={registrationHandler} />
        </form>
      </TabPanel>
    </TabView>
  );
}
