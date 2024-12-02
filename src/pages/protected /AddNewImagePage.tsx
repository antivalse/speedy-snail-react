/* Add New Image Page */

import UploadImageForm from "../../components/forms/UploadImageForm";

const AddNewImagePage = () => {
  return (
    <>
      <UploadImageForm heading="Add New Image" btnText="Add" isAddNew={true} />
    </>
  );
};

export default AddNewImagePage;
