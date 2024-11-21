/* Submit Button Component */

import React from "react";

interface SubmitButtonProps {
  btnText: string;
  className: string;
  submittingForm?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  btnText,
  className,
  submittingForm,
}) => {
  return (
    <button className={className} type="submit" disabled={submittingForm}>
      {btnText}
    </button>
  );
};

export default SubmitButton;
