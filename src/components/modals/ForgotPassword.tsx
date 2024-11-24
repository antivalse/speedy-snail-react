/* Forgot Password Popup Modal */

import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string | null>(null);

  const { resetPassword } = useAuth();

  const handleSubmit = async () => {
    // Abort if no email was submitted!
    if (!email) {
      return;
    }
    try {
      await resetPassword(email);
    } catch (err) {
      if (err instanceof Error) {
        console.error("There was an error sending reset email");
      }
    }
  };
  return (
    <div className="modal-overlay">
      <div className="forgot-password bg-p50 p-10 flex flex-col gap-5 color-p300">
        <h2 className="body body--secondary">Forgot password? No worries!</h2>
        <p>
          Enter email address below and we'll send you a password reset e-mail
        </p>
        <form action="submit" onSubmit={handleSubmit}>
          {" "}
          <label className="body">
            Email:
            <input
              type="email"
              className="bg-p100 color-p300 rounded-xl p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
