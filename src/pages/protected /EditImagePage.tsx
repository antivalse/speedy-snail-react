/* Edit Image Page */

import ImageForm from "../../components/forms/ImageForm";

const EditImagePage = () => {
  return (
    <>
      <ImageForm heading="Edit Image Details" btnText="Edit" isAddNew={false} />
    </>
  );
};

export default EditImagePage;
