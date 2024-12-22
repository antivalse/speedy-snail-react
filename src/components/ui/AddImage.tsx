/* Add Image Component */

import { plusIcon } from "../../assets/icons";

interface AddImageProps {
  handleClick: () => void;
  isLongSchedule?: boolean;
}

const AddImage: React.FC<AddImageProps> = ({ handleClick, isLongSchedule }) => {
  return (
    <div
      className={`${
        isLongSchedule ? "add-image add-image--long" : "add-image"
      } bg-p150 flex justify-center items-center cursor-pointer`}
      onClick={handleClick}
    >
      {plusIcon}
    </div>
  );
};

export default AddImage;
