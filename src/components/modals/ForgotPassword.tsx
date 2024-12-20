/* Forgot Password Popup Modal */

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

interface ForgotPasswordProps {
  setShowModal: (value: boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setShowModal }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { setLoading, resetPassword } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading to set a fake loading state
    // Abort if no email was submitted!
    if (!email) {
      return;
    }
    try {
      await resetPassword(email);
      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
        setLoading(false);
      }, 2000);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError("There was an error sending reset email");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try reset your machine");
      }
    }
  };
  return (
    <>
      <div className="modal-overlay">
        <div className="forgot-password bg-p50 p-10 flex flex-col items-center gap-5 color-p300">
          <h2 className="body body--secondary">
            Forgot password? No worries, we got you.
          </h2>
          <p>
            Enter email address below and we'll send you a password reset e-mail
          </p>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            {" "}
            <input
              type="email"
              className="form__input-field"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn--submit" onClick={handleSubmit}>
              Send
            </button>
          </form>
          {error && error.length > 0 && (
            <p
              className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
