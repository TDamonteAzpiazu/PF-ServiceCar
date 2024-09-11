import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateCreateSucursal } from "@/helpers/validateForms";
import "../../../styles/forms.css";
import { createSucursal } from "@/helpers/serviciosFetch";
import Cookies from "js-cookie";
import { ISucursales, ISucursalesDto } from "@/helpers/types/types";

const FormCreateSucursal: React.FC<{
  FetchSucursales: () => Promise<ISucursales[]>;
  setViewCreateSucursal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ FetchSucursales,setViewCreateSucursal }) => {
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const handleCreateSucursal = async (values: ISucursalesDto) => {
    const response = await createSucursal(token!, setError, values);
    if (response) {
      setViewCreateSucursal(false)
      await FetchSucursales();
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        latitud: "",
        longitud: "",
        details: "",
      }}
      validate={validateCreateSucursal}
      onSubmit={async (values) => {
        await handleCreateSucursal(values);
      }}
    >
      {(formikProps) => (
        <Form className="flex w-full gap-3 h-full flex-col">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Nombre</span>
              <Field
                type="text"
                name="name"
                className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
            ${formikProps.errors.name || error ? "error" : ""}
          `}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="name" />
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Dirección</span>
              <Field
                type="text"
                name="address"
                className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
            ${
              (formikProps.errors.address && formikProps.touched.address) ||
              error
                ? "error"
                : ""
            }
          `}
              />

              <span style={{ color: "red" }}>
                <ErrorMessage name="address" />
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Latitud</span>
              <Field
                type="text"
                name="latitud"
                className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
            ${
              (formikProps.errors.latitud && formikProps.touched.latitud) ||
              error
                ? "error"
                : ""
            }
          `}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="latitud" />
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Longitud</span>
              <Field
                type="text"
                name="longitud"
                className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
            ${
              (formikProps.errors.longitud && formikProps.touched.longitud) ||
              error
                ? "error"
                : ""
            }
          `}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="longitud" />
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Detalle</span>
              <Field
                as="textarea"
                type="text"
                name="details"
                className={`resize-none border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
            ${
              (formikProps.errors.details && formikProps.touched.details) ||
              error
                ? "error"
                : ""
            }
          `}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="details" />
              </span>
            </div>
          </div>

          {error ? <p className="text-red-600">¡{error}!</p> : ""}
          <div className="flex h-10 mt-4 justify-center w-full">
            <button
              type="submit"
              className="bg-custom-red rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red"
            >
              Crear
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormCreateSucursal;
