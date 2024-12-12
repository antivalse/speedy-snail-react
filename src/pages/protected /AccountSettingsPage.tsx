/* Account Settings Page */

import { accountSettingsDefault } from "../../assets/infoMessages";
import Assistant from "../../components/content/Assistant";
import SettingsForm from "../../components/forms/SettingsForm";

const AccountSettingsPage = () => {
  return (
    <>
      <div className="relative">
        <Assistant message={accountSettingsDefault} />
        <SettingsForm />
      </div>
    </>
  );
};

export default AccountSettingsPage;
