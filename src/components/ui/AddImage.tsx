/* Add Image Component */

import { plusIcon } from "../../assets/icons";

interface AddImageProps {
  handleClick: () => void;
}

const AddImage: React.FC<AddImageProps> = ({ handleClick }) => {
  return (
    <div
      className="add-image bg-p150 flex justify-center items-center"
      onClick={handleClick}
    >
      <span className="cursor-pointer">{plusIcon}</span>
    </div>
  );
};

export default AddImage;
