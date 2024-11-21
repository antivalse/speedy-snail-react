/* Settings Form Component */

import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { avatars } from "../../assets/icons";
import { SignupDetails } from "./SignupForm";

const SettingsForm = () => {
  const [submittingForm, setSubmittingForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null); // State to track selected avatar

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
  const { updateUserEmail } = useAuth();

  // Get reference to password
  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onUpdate: SubmitHandler<SignupDetails> = async (data) => {
    setSubmittingForm(true);

    try {
      await updateUserEmail(data.email);
      navigate("/today");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      setSubmittingForm(false);
    }
  };

  const handleAvatarSelect = (id: number) => {
    setSelectedAvatar(id); // Update the selected avatar on click
  };

  return (
    <div className="form container mx-auto p-12 flex flex-col items-center gap-12">
      <h2 className="heading heading--primary color-p300">Account Details</h2>
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="flex flex-col gap-6 w-full max-w-md"
      >
        {" "}
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="email">
            {" "}
            Update Email
          </label>
          <input
            type="email"
            className="form__input-field"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message || "Invalid value"}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="password">
            {" "}
            New Password
          </label>
          <input
            type="password"
            className="form__input-field"
            {...register("password", {
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
            Confirm New Password
          </label>
          <input
            type="password"
            className="form__input-field"
            autoComplete="off"
            {...register("confirmPassword", {
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
            Try a new avatar
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
        <div className="flex justify-center gap-5">
          <SubmitButton
            btnText="Update"
            className="btn btn--submit self-center cursor-pointer"
            submittingForm={submittingForm}
          />
          <SubmitButton
            btnText="Delete Account"
            className="btn btn--submit btn--submit--danger cursor-pointer"
            submittingForm={submittingForm}
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
