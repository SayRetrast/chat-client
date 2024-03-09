import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { TabPanel, TabView } from "primereact/tabview";

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
  return (
    <TabView className="auth-card-container">
      <TabPanel header="Sign in">
        <form className="flex flex-col gap-y-2" method="post">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username">Username</label>
            <InputText className="w-full" id="username" />
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Password</label>
            <Password className="block" inputId="password" footer={PasswordFooter} toggleMask />
          </div>

          <Button type="submit" label="Sign in" />
        </form>
      </TabPanel>

      <TabPanel header="Sign up">
        <form className="flex flex-col gap-y-2" method="post">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username">Username</label>
            <InputText className="w-full" id="username" />
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Password</label>
            <Password className="block" inputId="password" feedback={false} toggleMask />
          </div>

          <Button type="submit" label="Sign up" />
        </form>
      </TabPanel>
    </TabView>
  );
}
