/* Account Settings Page */

import { accountSettingsMessage } from "../../assets/infoMessages";
import Assistant from "../../components/content/Assistant";
import SettingsForm from "../../components/forms/SettingsForm";

const AccountSettingsPage = () => {
  return (
    <>
      <div className="relative">
        <Assistant message={accountSettingsMessage} />
        <SettingsForm />
      </div>
    </>
  );
};

export default AccountSettingsPage;
