/* Edit Image Page */

import { useParams } from "react-router-dom";
import ImageForm from "../../components/forms/ImageForm";
import useGetDocument from "../../hooks/useGetDocument";
import { imagesCollection } from "../../firebase/config";

const EditImagePage = () => {
  const { id } = useParams();

  // Get image
  const { data } = useGetDocument(imagesCollection, id);

  return (
    <>
      <ImageForm
        heading="Edit Image Details"
        btnText="Edit"
        isAddNew={false}
        imageData={data}
      />
    </>
  );
};

export default EditImagePage;
