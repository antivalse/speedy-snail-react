/* Settings Form Component */

import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { avatars } from "../../assets/icons";
import { UpdateUserDetails } from "../../types/User.types";
import useGetUser from "../../hooks/useGetUser";
import { FirebaseError } from "firebase/app";
import LoadingSpinner from "../ui/LoadingSpinner";
import ConfirmationModal from "../modals/ConfirmationModal";

const SettingsForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null); // State to track selected avatar
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  // Get user details and update functions from auth context
  const {
    email,
    updateUserEmail,
    updateUserPassword,
    updateUserAvatar,
    deleteUserAccount,
    reAuthenticateUser,
  } = useAuth();

  // Get avatar id from useGetUser hook
  const { avatarId } = useGetUser();

  // Access useForm hook from React hook form
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateUserDetails>({
    defaultValues: {
      email: email ?? "",
    },
  });

  // Add navigate to send user to today page
  const navigate = useNavigate();

  // Get reference to password
  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  // Get reference to current password input
  const modalPasswordRef = useRef("");
  modalPasswordRef.current = watch("currentPassword");

  // Handle case where user choses confirm deletion on confirmation modal
  const onDelete = async () => {
    try {
      // Re-authenticate user with the current password
      if (!email) {
        throw new Error("Unable to retrieve email for re-authentication.");
      }

      await deleteUserAccount();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      navigate("/");
    }
  };

  // Handle case where user choses to cancel delete in confirmation modal
  const handleCancel = () => {
    setShowConfirmationModal(false);
    reset();
  };

  // Handle case where user choses to submit the form and update their information
  const onUpdate: SubmitHandler<UpdateUserDetails> = async (data) => {
    setSubmittingForm(true);
    try {
      // Re-authenticate user with the current password
      if (!email) {
        throw new Error("Unable to retrieve email for re-authentication.");
      }

      await reAuthenticateUser(data.currentPassword);

      // Update email if provided
      if (data.email && data.email !== email) {
        await updateUserEmail(data.email);
      }
      // Update password if provided
      if (data.password) {
        await updateUserPassword(data.password);
      }

      // Update avatar if new one is chosen
      if (data.avatarId && data.avatarId !== avatarId) {
        await updateUserAvatar(data.avatarId);
      }

      reset();
      setSuccess(true);
      setSubmittingForm(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        reset();
        setSubmittingForm(false);
      }
      if (err instanceof FirebaseError) {
        setError(err.message);
        reset();
        setSubmittingForm(false);
      }
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
            Update Email
          </label>
          <input
            type="email"
            className="form__input-field"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for email validation
                message: "Please enter a valid email address",
              },
            })}
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
                  !passwordRef.current ||
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
                    {...register("avatarId", {})}
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
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="currentPassword">
            Enter current password to verify changes
          </label>
          <input
            type="password"
            className="form__input-field"
            {...register("currentPassword", {
              required:
                "Current password is required for update/delete actions!",
              minLength: {
                message: "Password must be at least 8 characters",
                value: 8,
              },
            })}
          />
          {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
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
            onClick={() => setShowConfirmationModal(true)}
          />
        </div>
      </form>
      {error && error.length > 0 && (
        <div
          className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div
          className="p-4 mb-4 text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <p>Updated account ✅</p>
        </div>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          heading="Want to delete your account?"
          textContent="Enter password before proceeding"
          onCancel={handleCancel}
          onConfirm={onDelete}
        />
      )}
      {submittingForm && <LoadingSpinner />}
    </div>
  );
};

export default SettingsForm;
