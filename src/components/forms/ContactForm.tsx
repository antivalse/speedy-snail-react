/* Contact Form Component */

import emailjs from "emailjs-com";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { closeIcon } from "../../assets/icons";
import { ContactInfo } from "../../types/ContactForm.types";
import SubmitButton from "../buttons/SubmitButton";

interface ContactFormProps {
  closeModal: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ closeModal }) => {
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInfo>();

  const onSubmit: SubmitHandler<ContactInfo> = async () => {
    try {
      setSubmittingForm(true);

      // Get the form element reference
      const form = document.getElementById("contact-form");

      if (form && form instanceof HTMLFormElement) {
        // Send email using EmailJS
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }

      reset();
      setSuccess(true);
      setTimeout(() => {
        closeModal(); // Close the modal but show success message for 2 seconds
      }, 2000);
    } catch (err) {
      setError(`Error sending email: ${err}`);
      setSubmittingForm(false);
    }
  };

  return (
    <div className="modal-overlay modal-overlay--lighter">
      <div className="form mx-auto p-12 flex flex-col items-center bg-p50">
        <span
          className="self-end mb-10 cursor-pointer"
          onClick={() => closeModal()}
        >
          {closeIcon}
        </span>
        <form
          id="contact-form" // Ensure the form has the correct ID
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
        >
          <h2 className="heading heading--primary">
            Send us your thoughts or questions!
          </h2>
          <label htmlFor="name">Name:</label>
          <input
            {...register("name", { required: true })}
            className="form__input-field"
          />
          {errors.name && <span>Please enter your name</span>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form__input-field"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter a valid email address</span>}

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="form__input-field"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <span>Message is required</span>}

          <SubmitButton
            btnText={success ? "Sent!" : submittingForm ? "Sending..." : "Send"}
            submittingForm={submittingForm}
            success={success}
            className={`btn btn--submit self-center cursor-pointer ${
              success || submittingForm ? "opacity-75 cursor-none" : ""
            }`}
          />
        </form>
        {success && (
          <p className="p-4 my-4 text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400">
            Message sent! We will get back to you as speedily as possilbe
          </p>
        )}

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
  );
};

export default ContactForm;
