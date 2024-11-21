/* Add New Image Page */

import ImageForm from "../../components/forms/ImageForm";

const AddNewImagePage = () => {
  return (
    <>
      <ImageForm heading="Add New Image" btnText="Add" isAddNew={true} />
    </>
  );
};

export default AddNewImagePage;
