/* Settings Form Component */

import { FirebaseError } from "firebase/app";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { avatars } from "../../assets/icons";
import useAuth from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import { UpdateUserDetails } from "../../types/User.types";
import ConfirmationModal from "../modals/ConfirmationModal";
import SubmitButton from "../buttons/SubmitButton";
import LoadingSpinner from "../ui/LoadingSpinner";

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
    updateUsername,
    deleteUserAccount,
    reAuthenticateUser,
  } = useAuth();

  // Get avatar id from useGetUser hook
  const { avatarId, data, getUserError } = useGetUser();

  const username = data?.username;

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
      username: data?.username,
    },
  });

  // Add navigate to send user to schedule page
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

      // Update username if new one is entered
      if (data.username && data.username !== username) {
        await updateUsername(data.username);
      }

      // Update avatar if new one is chosen
      if (data.avatarId && data.avatarId !== avatarId) {
        await updateUserAvatar(data.avatarId);
      }

      reset();
      setSuccess(true);
      setSubmittingForm(false);
      setTimeout(() => {
        setSuccess(false); // Close the modal but show success message for 2 seconds
      }, 2000);
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

  // Use effect to reset form when email changes
  useEffect(() => {
    reset({
      email: email ?? "",
      username: username ?? "",
    });
  }, [email, reset, username]);

  return (
    <div className="form container mx-auto p-12 flex flex-col items-center gap-12 bg-p50">
      <h2 className="heading heading--primary color-p300">Account Details</h2>
      <form
        onSubmit={handleSubmit(onUpdate)}
        className="flex flex-col gap-6 w-full max-w-md"
      >
        {" "}
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="username">
            Update Username
          </label>
          <input
            type="text"
            className="form__input-field"
            {...register("username", {
              onChange: (e) => (e.target.value = e.target.value.trim()),
              minLength: {
                message: "You have to enter at least 3 characters",
                value: 3,
              },
            })}
          />
          {errors.username && (
            <p>{errors.username.message || "Invalid value"}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="color-p300 text-left" htmlFor="email">
            Update Email
          </label>
          <input
            type="email"
            className="form__input-field"
            {...register("email", {
              onChange: (e) => (e.target.value = e.target.value.trim()),
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
              onChange: (e) => (e.target.value = e.target.value.trim()),
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
              onChange: (e) => (e.target.value = e.target.value.trim()),
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
          <ul className="form__avatars flex justify-center my-2">
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
        <div className="flex flex-wrap justify-around">
          <SubmitButton
            btnText="Update"
            className="btn btn--submit self-center cursor-pointer"
            submittingForm={submittingForm}
          />
          <button
            className="btn btn--submit btn--submit--danger cursor-pointer"
            onClick={() => setShowConfirmationModal(true)}
          >
            Delete Account
          </button>
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
      {getUserError && (
        <div
          className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <p>
            There was an error getting the user information. Try again later?
          </p>
        </div>
      )}
      {success && (
        <p className="p-4 my-4 text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400">
          Updated account ✅
        </p>
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
