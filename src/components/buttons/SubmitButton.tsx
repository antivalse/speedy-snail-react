/* Submit Button Component */

import React from "react";

interface SubmitButtonProps {
  btnText: string;
  className: string;
  submittingForm?: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  btnText,
  className,
  submittingForm,
  onClick,
}) => {
  return (
    <button
      className={className}
      type="submit"
      onClick={onClick}
      disabled={submittingForm}
    >
      {btnText}
    </button>
  );
};

export default SubmitButton;
