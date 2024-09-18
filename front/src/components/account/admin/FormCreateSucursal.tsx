import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateCreateSucursal } from "@/helpers/validateForms";
import "../../../styles/forms.css";
import { createSucursal, FetchServicio } from "@/helpers/serviciosFetch";
import Cookies from "js-cookie";
import { IService, ISucursales, ISucursalesDto } from "@/helpers/types/types";

const FormCreateSucursal: React.FC<{
  FetchSucursales: () => Promise<ISucursales[]>;
  setViewCreateSucursal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ FetchSucursales, setViewCreateSucursal }) => {
  const [error, setError] = useState<string | null>(null);
  const [servicios, setServicios] = useState<IService[] | null>([]);
  const [selectedServicios, setSelectedServicios] = useState<string[]>([]);
  const [showSucursalesDropdown, setShowSucursalesDropdown] = useState(false);
  const token = Cookies.get("token");

  const handleCreateSucursal = async (values: ISucursalesDto) => {
    const dataSend = {
      name: values.name,
      address: values.address,
      latitud: values.latitud,
      longitud: values.longitud,
      details: values.details,
      services: selectedServicios,
    };
    const response = await createSucursal(token!, setError, dataSend);
    if (response) {
      setViewCreateSucursal(false);
      await FetchSucursales();
    }
  };

  useEffect(() => {
    FetchServicio()
      .then((res) => {
        setServicios(res.filter((service) => service.status === "active"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSucursalToggle = (sucursal: string) => {
    setSelectedServicios((prev) => {
      const updated = prev.includes(sucursal)
        ? prev.filter((item) => item !== sucursal)
        : [...prev, sucursal];
      return updated;
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        latitud: "",
        longitud: "",
        details: "",
        servicios: selectedServicios,
      }}
      validate={validateCreateSucursal(selectedServicios)}
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
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Servicios</span>

              <div className="flex items-center">
                <Field
                  type="text"
                  name="servicios"
                  disabled
                  value={selectedServicios.join(", ")}
                  className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                  ${
                    (formikProps.errors.servicios &&
                      formikProps.touched.servicios) ||
                    error
                      ? "error"
                      : ""
                  }
                `}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowSucursalesDropdown(!showSucursalesDropdown)
                  }
                  className="ml-2 bg-custom-red text-white p-2 rounded"
                >
                  {showSucursalesDropdown ? "▲" : "▼"}
                </button>
              </div>

              <span style={{ color: "red" }}>
                <ErrorMessage name="servicios" />
              </span>
              {showSucursalesDropdown && (
                <div className="absolute top-full mt-2 w-10/12 max-h-40 overflow-y-auto bg-[#2b2b2b] border border-neutral-700 rounded z-10">
                  {servicios?.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 cursor-pointer ${
                        selectedServicios.includes(item.type)
                          ? "bg-gray-600"
                          : ""
                      }`}
                      onClick={() => handleSucursalToggle(item.type)}
                    >
                      {item.type}
                    </div>
                  ))}
                </div>
              )}
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
