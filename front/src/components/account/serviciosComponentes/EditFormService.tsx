import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IService, IServiceDto } from "@/helpers/types/types";
import { updateService } from "@/helpers/serviciosFetch";
import Cookies from "js-cookie";

const EditFormService: React.FC<{
  service: IService;
  FetchServices: () => Promise<IService[]>;
  setViewEditService: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ service, FetchServices, setViewEditService }) => {
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");

  const handleEditService = async (values: IServiceDto) => {
    const response = await updateService(token!, setError, values, service.id);
    if (response) {
      setViewEditService(false);
      await FetchServices();
    }
  };

  const sucursalesList = service.sucursales.join(", ");

  return (
    <Formik
      initialValues={{
        type: service.type,
        price: service.price,
        description: service.description,
        sucursales: sucursalesList,
        vehiculo: service.vehiculo,
        status: service.status,
      }}
      onSubmit={async (values) => {
        const updatedValues = {
          ...values,
          sucursales: values.sucursales.split(", ").map(sucursal => sucursal.trim()),
        };
        await handleEditService(updatedValues);
      }}
    >
      {({ dirty, values, errors, touched }) => (
        <Form className="flex w-full gap-3 h-full flex-col">
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Tipo</span>
              <Field
                type="text"
                name="type"
                disabled
                className="border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full"
              />
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Precio</span>
              <Field
                type="number"
                name="price"
                className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                ${(errors.price && touched.price) || error ? "error" : ""}`}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="price" />
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Descripción</span>
              <Field
                as="textarea"
                name="description"
                className={`resize-none border-[1.8px] h-[140px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                ${(errors.description && touched.description) || error ? "error" : ""}`}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="description" />
              </span>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Sucursales</span>
              <Field
                type="text"
                name="sucursales"
                disabled
                className="border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full"
                value={sucursalesList}
              />
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Vehículo</span>
              <Field
                type="text"
                name="vehiculo"
                disabled
                className="border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full"
              />
            </div>
            <div className="w-full flex flex-col">
              <span className="text-custom-white text-sm">Estado</span>
              <Field
                type="text"
                name="status"
                disabled
                className="border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full"
              />
            </div>
          </div>

          {error ? <p className="text-red-600">¡{error}!</p> : ""}
          <div className="flex h-10 mt-4 justify-center w-full">
            <button
              type="submit"
              className={`bg-custom-red text-custom-white rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red ${
                !dirty ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!dirty}
            >
              Guardar Cambios
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditFormService;
