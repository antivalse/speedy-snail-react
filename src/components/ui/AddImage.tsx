/* Add Image Component */

import { plusIcon } from "../../assets/icons";

const AddImage = () => {
  return (
    <div className="add-image bg-p150 flex justify-center items-center">
      <span className="cursor-pointer">{plusIcon}</span>
    </div>
  );
};

export default AddImage;
