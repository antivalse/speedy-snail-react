/* Add New Image Form Component */

import { editImageIcon, plusIcon } from "../../assets/icons";
import PlaceholderImg from "../../assets/images/placeholders/scheduleimg_test.png";
import SubmitButton from "../buttons/SubmitButton";

interface ImageFormProps {
  heading: string;
  btnText: string;
  isAddNew: boolean;
}

const ImageForm: React.FC<ImageFormProps> = ({
  heading,
  btnText,
  isAddNew,
}) => {
  return (
    <div className="form mx-auto p-12 flex flex-col items-center gap-12">
      <h2 className="heading heading--primary color-p300">{heading}</h2>
      <form className="flex flex-col gap-4">
        {isAddNew ? (
          <div>
            <h3>Image</h3>
            <div className="form__add-image bg-p100 flex justify-center items-center mt-3">
              <span>{plusIcon}</span>
            </div>
          </div>
        ) : (
          <div className="relative">
            <span className="absolute top-2 right-2 cursor-pointer">
              {editImageIcon}
            </span>
            <img src={PlaceholderImg} alt="Image" />
          </div>
        )}
        <label className="color-p300" htmlFor="title">
          Title
        </label>
        <input type="text" className="form__input-field" />
        <label className="color-p300" htmlFor="category">
          Category
        </label>
        <input type="text" className="form__input-field" />

        <SubmitButton
          className="btn btn--submit self-center"
          btnText={btnText}
        />
      </form>
    </div>
  );
};

export default ImageForm;
