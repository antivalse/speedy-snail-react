/* Submit Button Component */

import React from "react";

interface SubmitButtonProps {
  btnText: string;
  className: string;
  submittingForm?: boolean;
  success?: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  btnText,
  className,
  submittingForm,
  success,
  onClick,
}) => {
  return (
    <button
      className={className}
      type="submit"
      onClick={onClick}
      disabled={submittingForm || success}
    >
      {btnText}
    </button>
  );
};

export default SubmitButton;
