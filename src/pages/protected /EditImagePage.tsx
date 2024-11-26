/* Edit Image Page */

import { useParams } from "react-router-dom";
import ImageForm from "../../components/forms/ImageForm";
import useGetImages from "../../hooks/useGetImages";

const EditImagePage = () => {
  const { id } = useParams();

  // Get images
  const { data } = useGetImages();

  // Find image that was clicked
  const imageToDisplay = data?.find((image) => image._id === id);

  return (
    <>
      <ImageForm
        heading="Edit Image Details"
        btnText="Edit"
        isAddNew={false}
        imgUrl={imageToDisplay?.url}
        imgAlt={imageToDisplay?.title}
      />
    </>
  );
};

export default EditImagePage;
