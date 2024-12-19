import { SubmitHandler, useForm } from "react-hook-form";
import { ContactInfo } from "../../types/ContactForm.types";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { closeIcon } from "../../assets/icons";
import emailjs from "emailjs-com";

interface ContactFormProps {
  closeModal: () => void;
}

// const SERVICE_ID = "service_s6t2il9";
// const TEMPLATE_ID = "template_wk0hx9k";
// const PUBLIC_KEY = "IFv6kTnEmbcVeXB3a";

const ContactForm: React.FC<ContactFormProps> = ({ closeModal }) => {
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInfo>();

  const onSubmit: SubmitHandler<ContactInfo> = async (data, e) => {
    e?.preventDefault(); // Prevent the default form submission behavior
    console.log("data is: ", data);

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
      console.log("Email sent successfully!");
      closeModal(); // Close the modal after sending the email
    } catch (err) {
      console.log("Error sending email:", err); // Log the full error
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
            btnText={submittingForm ? "Sending..." : "Send"}
            submittingForm={submittingForm}
            className="btn btn--submit self-center cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
