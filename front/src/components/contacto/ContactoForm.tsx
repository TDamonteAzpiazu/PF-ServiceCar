"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { FormValues } from "@/helpers/types/types";
import { validateForm } from "@/helpers/validateForms";
import SendFormContact from "./SendFormContact";

const ContactoForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    asunto: "",
    message: "",
  });
  const [errorValues, setErrorValues] = useState<Partial<FormValues>>({});

  const [formSubmit, setFormSubmit] = useState<boolean>(false);

  const publicKey: string | undefined = process.env.NEXT_PUBLIC_PUBLICKEY;
  const templateId: string | undefined = process.env.NEXT_PUBLIC_TEMPLATEID;
  const serviceId: string | undefined = process.env.NEXT_PUBLIC_SERVICEID;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { errors, isValid } = validateForm(formValues);
    setErrorValues(errors);
    if (isValid === false) return;

    emailjs
      .sendForm(serviceId!, templateId!, "#comment-form", publicKey)
      .then(() => {
        setFormSubmit(true);
        setFormValues({ name: "", email: "", asunto: "", message: "" });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section className="p-6 bg-black rounded-xl text-white h-auto">
      {formSubmit ? (
        <SendFormContact setFormSubmit={setFormSubmit} />
      ) : (
        <div>
          <h4 className="text-sm text-gray-500 mb-4">
            Comparte tus sugerencias o inquietudes para que podamos mejorar
            nuestros servicios.
          </h4>
          <h2 className="text-xl font-bold mb-4">Déjanos tu comentario</h2>
          <form id="comment-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <span>Nombre</span>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                className={`bg-black w-full p-2 border rounded-xl ${
                  errorValues.name ? "border-red-500" : ""
                }`}
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
              {errorValues.name && (
                <p className="text-red-500 text-xs mt-1">{errorValues.name}</p>
              )}
            </div>
            <div className="mb-4">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`bg-black w-full p-2 border rounded-xl ${
                  errorValues.email ? "border-red-500" : ""
                }`}
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />
              {errorValues.email && (
                <p className="text-red-500 text-xs mt-1">{errorValues.email}</p>
              )}
            </div>
            <div className="mb-4">
              <span>Asunto</span>
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                className={`bg-black w-full p-2 border rounded-xl ${
                  errorValues.asunto ? "border-red-500" : ""
                }`}
                value={formValues.asunto}
                onChange={(e) =>
                  setFormValues({ ...formValues, asunto: e.target.value })
                }
              />
              {errorValues.asunto && (
                <p className="text-red-500 text-xs mt-1">
                  {errorValues.asunto}
                </p>
              )}
            </div>
            <textarea
              name="message"
              cols={15}
              rows={5}
              placeholder="Mensaje"
              className={`bg-black w-full p-2 border rounded-xl ${
                errorValues.message ? "border-red-500" : ""
              }`}
              value={formValues.message}
              onChange={(e) =>
                setFormValues({ ...formValues, message: e.target.value })
              }
            ></textarea>
            {errorValues.message && (
              <p className="text-red-500 text-xs mt-1">{errorValues.message}</p>
            )}
            <button type="submit" className="custom-button">
              Enviar Mensaje
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ContactoForm;
