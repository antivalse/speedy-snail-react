import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import useAuth from "../../hooks/useAuth";

interface ConformationModalProps {
  heading: string;
  textContent: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConformationModalProps> = ({
  heading,
  textContent,
  onCancel,
  onConfirm,
}) => {
  const [password, setPassword] = useState<string>(""); // Store password input
  const [error, setError] = useState<string | null>(null);

  const { reAuthenticateUser } = useAuth();

  const handleDelete = async () => {
    setError(null);

    try {
      // Call the reAuthenticateUser function
      await reAuthenticateUser(password);

      // If re-authentication is successful, proceed with onConfirm
      onConfirm();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="modal-overlay modal-overlay--lighter">
      <div className="forgot-password bg-p50 p-10 flex flex-col items-center gap-5 color-p300">
        <h2 className="body body--secondary">{heading}</h2>
        <p>{textContent}</p>

        <input
          type="password"
          className="form__input-field"
          required
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />

        {error && error.length > 0 && (
          <div
            className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <p>Incorrect password, try again?</p>
          </div>
        )}

        <div className="flex justify-center gap-5">
          <SubmitButton
            btnText="Cancel"
            className="btn btn--submit self-center cursor-pointer bg-p50 color-p300"
            onClick={onCancel}
          />
          <SubmitButton
            btnText="Delete"
            className="btn btn--submit btn--submit--danger cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
