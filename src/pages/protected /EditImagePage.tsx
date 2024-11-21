/* Edit Image Page */

import ImageForm from "../../components/forms/ImageForm";
import SecondaryNavbar from "../../components/navigation/SecondaryNavbar";

const EditImagePage = () => {
  return (
    <>
      <SecondaryNavbar />
      <ImageForm heading="Edit Image Details" btnText="Edit" isAddNew={false} />
    </>
  );
};

export default EditImagePage;
