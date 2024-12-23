/* Login Form Component */

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SubmitButton from "../buttons/SubmitButton";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import ForgotPassword from "../modals/ForgotPassword";
import LoadingSpinner from "../ui/LoadingSpinner";

type LoginDetails = {
  email: string;
  password: string;
};

interface LoginFormProps {
  data?: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDetails>();

  const onLogin: SubmitHandler<LoginDetails> = async (data) => {
    setSubmittingForm(true);
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/launchpad");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setLoading(false);
        setError(err.message);
      }
      if (err instanceof Error) {
        setLoading(false);
        setError(err.message);
      }
    }
    setLoading(false);
    setSubmittingForm(false);
  };

  useEffect(() => {
    scrollToDiv("login-form");
  }, []);

  return (
    <>
      <div
        id="login-form"
        className="form container mx-auto p-12 flex flex-col items-center gap-12 bg-p50"
      >
        <h2 className="heading heading--primary color-p300">
          Start Planning Your Day
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onLogin)}>
          <label className="color-p300" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form__input-field"
            {...register("email", { required: "Please enter a email adress" })}
          />
          {errors.email && <p>{errors.email.message || "Invalid value"}</p>}
          <label className="color-p300" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form__input-field"
            {...register("password", {
              required: "Please enter a password with at least 8 characters",
              minLength: {
                message: "You have to enter at least 8 characters",
                value: 8,
              },
            })}
          />{" "}
          {errors.password && (
            <p>{errors.password.message || "Invalid password"}</p>
          )}
          <p className="mt-5">
            Forgot your password?{" "}
            <span
              className="form__reset underline cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Click here to reset
            </span>
          </p>
          <SubmitButton
            btnText="Login"
            submittingForm={submittingForm}
            className="btn btn--submit self-center cursor-pointer"
          />
        </form>
        {error && error.length > 0 && (
          <div
            className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <p>
              {error} Try again or{" "}
              <Link className="form__reset underline color-p300" to="/signup">
                go to signup
              </Link>{" "}
            </p>
          </div>
        )}
      </div>
      {showModal && <ForgotPassword setShowModal={setShowModal} />}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default LoginForm;
