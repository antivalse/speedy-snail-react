/* Signup Form Component */

import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { avatars } from "../../assets/icons";
import { SignupDetails } from "../../types/User.types";
import scrollToDiv from "../../utils/helpers/scrollToDiv";
import { FirebaseError } from "firebase/app";

const SignupForm = () => {
  const [submittingForm, setSubmittingForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Access useForm hook from React hook form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignupDetails>();

  // Add navigate to send user to today page
  const navigate = useNavigate();

  // Get the signup function from auth context
  const { signup } = useAuth();

  // Get reference to password
  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<SignupDetails> = async (data) => {
    setSubmittingForm(true);

    try {
      await signup(data.email, data.password, data.username, data.avatarId);
      navigate("/today");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Something unexpected happened, please try again later");
      }
      setSubmittingForm(false);
    }
  };

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  useEffect(() => {
    scrollToDiv("signup-form");
  }, []);

  return (
    <div
      id="signup-form"
      className="form container mx-auto p-12 flex flex-col items-center gap-12"
    >
      <h2 className="heading heading--primary color-p300">
        Let&apos;s get started!
      </h2>
      <form
        onSubmit={handleSubmit(onSignup)}
        className="flex flex-col gap-6 w-full max-w-md"
      >
        {" "}
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left"> Username</label>
          <input
            type="text"
            className="form__input-field"
            {...register("username", {
              required: "Please enter a username",
              minLength: {
                message: "Please choose a username with at least 3 characters",
                value: 3,
              },
            })}
          />
          {errors.email && <p>{errors.email.message || "Invalid value"}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="email">
            {" "}
            Email
          </label>
          <input
            type="email"
            className="form__input-field"
            {...register("email", { required: "Please enter a email adress" })}
          />
          {errors.email && <p>{errors.email.message || "Invalid value"}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="password">
            {" "}
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
          />
          {errors.password && (
            <p>{errors.password.message || "Invalid password"}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="password">
            {" "}
            Confirm Password
          </label>
          <input
            type="password"
            className="form__input-field"
            autoComplete="off"
            {...register("confirmPassword", {
              required: "",
              minLength: {
                message: "You have to enter at least 8 characters",
                value: 8,
              },
              validate: (passwordValue) => {
                return (
                  passwordValue === passwordRef.current ||
                  "Passwords do not match"
                );
              },
            })}
          />
          {errors.confirmPassword && (
            <p>{errors.confirmPassword.message || "Invalid value"}</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <h3 className="heading heading--primary color-p300 mt-10 text-center">
            Pick an avatar
          </h3>
          <ul className="form__avatars flex flex-wrap justify-center gap-8 p-5 my-8">
            {avatars.map((avatar) => (
              <li key={avatar.id} className="form__avatars__icon">
                <label>
                  <input
                    type="radio"
                    value={avatar.id}
                    {...register("avatarId", {
                      required: "You must select an avatar",
                    })}
                    className="hidden"
                    onClick={() => handleAvatarSelect(avatar.id)}
                  />
                  <div
                    className={`avatar-icon cursor-pointer ${
                      selectedAvatar === avatar.id ? "selected" : ""
                    }`}
                  >
                    {avatar.icon}
                  </div>
                </label>
              </li>
            ))}
          </ul>
          {errors.avatarId && (
            <p className="error-message">
              {errors.avatarId.message || "Please select an avatar"}
            </p>
          )}
        </div>
        <SubmitButton
          btnText="Sign-up"
          className="btn btn--submit self-center cursor-pointer"
          submittingForm={submittingForm}
        />
      </form>
      {error && error.length > 0 && (
        <div
          className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <p>
            {error} Try{" "}
            <Link className="form__reset underline color-p300" to="/login">
              logging in
            </Link>{" "}
            instead?
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
