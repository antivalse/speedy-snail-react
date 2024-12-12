/* Edit Image Page */

import { useParams } from "react-router-dom";
import useGetDocument from "../../hooks/useGetDocument";
import { imagesCollection } from "../../firebase/config";
import UpdateImageForm from "../../components/forms/UpdateImageForm";
import Assistant from "../../components/content/Assistant";
import { updateMessage } from "../../assets/infoMessages";

const EditImagePage = () => {
  const { id } = useParams();

  // Get image
  const { data } = useGetDocument(imagesCollection, id);

  return (
    <>
      <Assistant message={updateMessage} />
      <UpdateImageForm btnText="Edit" imageData={data} />
    </>
  );
};

export default EditImagePage;
