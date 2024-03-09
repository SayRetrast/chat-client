import { InputText } from "primereact/inputtext";
import SettingsGroup from "../../components/settings/settingsGroup";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import SettingsMenu from "../../components/settings/settingsMenu";
import SettingsMenuItem from "../../components/settings/settingsMenuItem";
import { RadioButton } from "primereact/radiobutton";
import SettingsSubTitle from "../../components/settings/settingsSubTitle";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <SettingsGroup title="Profile settings">
        <SettingsMenu>
          <SettingsMenuItem>
            <label htmlFor="avatar">Profile picture</label>

            <div className="grid grid-cols-[70px_1fr] gap-x-4">
              <Avatar className="h-[70px] w-[70px]" id="avatar" icon="pi pi-user" size="xlarge" />

              <div className="flex flex-col gap-y-2">
                <Button label="Upload picture" />
                <Button label="Cancel" disabled />
              </div>
            </div>
          </SettingsMenuItem>

          <SettingsMenuItem>
            <label htmlFor="username">Username</label>
            <InputText id="username" aria-describedby="username-help" placeholder="Your new username" />
            <Button label="Update username" />
          </SettingsMenuItem>

          <SettingsMenuItem>
            <label htmlFor="username">Password</label>
            <Password className="block" inputId="password" placeholder="Old password" feedback={false} toggleMask />
            <Password className="block" inputId="password" placeholder="New password" feedback={false} toggleMask />
            <Button label="Update password" />
          </SettingsMenuItem>
        </SettingsMenu>
      </SettingsGroup>

      <Divider />

      <SettingsGroup title="Chat settings">
        <SettingsMenu>
          <SettingsMenuItem>
            <SettingsSubTitle title="Dialog options" />

            <div className="flex items-center gap-x-2">
              <RadioButton inputId="as-read" name="as-read" value="as-read" checked />
              <label htmlFor="as-read">Mark messages as read when the dialog opens</label>
            </div>

            <div className="flex items-center gap-x-2">
              <RadioButton inputId="as-unread" name="as-unread" value="as-unread" />
              <label htmlFor="as-unread">Let messages stay unread when the dialog opens</label>
            </div>
          </SettingsMenuItem>

          <SettingsMenuItem>
            <SettingsSubTitle title="Anonymity options" />

            <div className="flex items-center gap-x-2">
              <RadioButton inputId="stay-online" name="stay-online" value="stay-online" checked />
              <label htmlFor="stay-online">Stay online</label>
            </div>

            <div className="flex items-center gap-x-2">
              <RadioButton inputId="sta-offline" name="stay-offline" value="sta-offline" />
              <label htmlFor="sta-offline">
                Stay offline (your status will be shown as offline even if you are using the app)
              </label>
            </div>
          </SettingsMenuItem>

          <Button label="Update chat settings" />
        </SettingsMenu>
      </SettingsGroup>
    </div>
  );
}
