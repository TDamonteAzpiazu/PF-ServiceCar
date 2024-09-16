import { validateCreateOpinion } from "@/helpers/validateForms";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import "../../styles/forms.css";
import Cookies from "js-cookie";
import { createOpinion } from "@/helpers/fetchOpinion";
import { IService } from "@/helpers/types/types";

const FormOpinion: React.FC<{
  service: IService;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ service, setIsMenuOpen }) => {
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;
  const handleCreateOpinion = async (values: any) => {
    const dataSend = {
      rating: Number(values.rating),
      occupation: values.occupation,
      comment: values.comment,
      idService: service.id,
    };
    console.log(service);
    try {
      const data = await createOpinion(url!, token!, dataSend);
      if (data) {
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ rating: "", occupation: "", comment: "" }}
        validate={validateCreateOpinion}
        onSubmit={async (values) => {
          await handleCreateOpinion(values);
        }}
      >
        {(formikProps) => (
          <Form className="flex w-full gap-3 h-full flex-col">
            <div className="flex gap-2 w-full">
              <div className="w-1/2 flex flex-col">
                <span className="text-custom-grey text-sm">Puntuación:</span>
                <Field
                  type="number"
                  name="rating"
                  className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
              ${
                (formikProps.errors.rating && formikProps.touched.rating) ||
                error
                  ? "error"
                  : ""
              }
            `}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="rating" />
                </span>
              </div>
              <div className="w-1/2 flex flex-col">
                <span className="text-custom-grey text-sm">
                  Ocupación: (opcional)
                </span>
                <Field
                  type="text"
                  name="occupation"
                  className="border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full"
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-grey text-sm">Comentario:</span>
              <Field
                as="textarea"
                type="text"
                name="comment"
                className={` resize-none border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
              ${
                (formikProps.errors.comment && formikProps.touched.comment) ||
                error
                  ? "error"
                  : ""
              }
            `}
              />

              <span style={{ color: "red" }}>
                <ErrorMessage name="comment" />
              </span>
            </div>
            {error ? <p className="text-red-600">¡{error}!</p> : ""}
            <div className="flex h-10 mt-4 justify-center w-full">
              <button
                type="submit"
                className="bg-custom-red rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red"
              >
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormOpinion;
