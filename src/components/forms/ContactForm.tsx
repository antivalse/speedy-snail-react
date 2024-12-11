/* Contact Form Component */

import { SubmitHandler, useForm } from "react-hook-form";
import { ContactInfo } from "../../types/ContactForm.types";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";

const ContactForm = () => {
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInfo>();
  const onSubmit: SubmitHandler<ContactInfo> = () => {
    try {
      // Collect form data
      // Set up with EmailJs later!

      setSubmittingForm(true);
      reset();
    } catch (err) {
      if (err instanceof Error) {
        console.log("there was an error");
      }
    }
  };
  return (
    <div className="modal-overlay">
      <div className="form mx-auto p-12 flex flex-col items-center bg-p50">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <h2 className="heading heading--primary">
            Send us your thoughts or questions!
          </h2>
          <label htmlFor="name">Name:</label>
          <input
            {...register("name", { required: true })}
            className="form__input-field"
          />
          {errors.name && <span>Please enter your name</span>}
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            className="form__input-field"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter a valid email adress</span>}
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form__input-field"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && <span>Message is required</span>}
          <SubmitButton
            btnText="Send"
            submittingForm={submittingForm}
            className="btn btn--submit self-center cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
