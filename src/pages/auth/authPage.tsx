import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../contexts/UserContext";
import { AccessTokenContext, AccessTokenContextType } from "../../contexts/AccessTokenContext";
import { registrationAPI } from "../../api/auth/registration.api";
import { jwtDecode } from "jwt-decode";
import { DecodedJwtType } from "../../types/decodedJwt.type";
import { loginAPI } from "../../api/auth/login.api";
import { useNavigate } from "react-router-dom";

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

  const { setUser } = useContext(UserContext) as UserContextType;
  const { setAccessToken } = useContext(AccessTokenContext) as AccessTokenContextType;

  const [formData, setFormData] = useState<{ username: string; password: string }>({ username: "", password: "" });

  async function registrationHandler() {
    const { accessToken } = await registrationAPI(formData);
    if (!accessToken) {
      throw new Error("Could not create an account.");
    }
    setAccessToken(accessToken);

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    setUser(userData);

    navigate("/");
  }

  async function loginHandler() {
    const { accessToken } = await loginAPI(formData);
    if (!accessToken) {
      throw new Error("Could not login to an account.");
    }
    setAccessToken(accessToken);

    const decodedJwt: DecodedJwtType = jwtDecode(accessToken);
    const userData = { id: decodedJwt.sub, username: decodedJwt.username };
    setUser(userData);

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
