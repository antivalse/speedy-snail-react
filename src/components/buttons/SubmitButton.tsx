/* Submit Button Component */

import React from "react";

interface SubmitButtonProps {
  btnText: string;
  submittingForm?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  btnText,
  submittingForm,
}) => {
  return (
    <button
      className="btn btn--submit self-center cursor-pointer"
      type="submit"
      disabled={submittingForm}
    >
      {btnText}
    </button>
  );
};

export default SubmitButton;
