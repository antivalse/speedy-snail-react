/* Add New Image Page */

import ImageForm from "../../components/forms/ImageForm";
import SecondaryNavbar from "../../components/navigation/SecondaryNavbar";

const AddNewImagePage = () => {
  return (
    <>
      <SecondaryNavbar />
      <ImageForm heading="Add New Image" btnText="Add" isAddNew={true} />
    </>
  );
};

export default AddNewImagePage;
