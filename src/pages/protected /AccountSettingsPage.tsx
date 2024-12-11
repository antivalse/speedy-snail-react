/* Account Settings Page */

import { accountSettingsDefault } from "../../assets/infoMessages";
import Assistant from "../../components/content/Assistant";
import SettingsForm from "../../components/forms/SettingsForm";

const AccountSettingsPage = () => {
  return (
    <>
      <Assistant message={accountSettingsDefault} />
      <SettingsForm />
    </>
  );
};

export default AccountSettingsPage;
