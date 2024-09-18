import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IService, IServiceDto, ISucursales } from "@/helpers/types/types";
import { updateService, FetchSucursales } from "@/helpers/serviciosFetch";
import Cookies from "js-cookie";
import { validateFormServiceEdit } from "@/helpers/validateForms";

const EditFormService: React.FC<{
  service: IService;
  setViewEditService: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: () => void;
}> = ({ service, setViewEditService, handleUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const [allSucursales, setAllSucursales] = useState<ISucursales[]>([]);
  const [selectedSucursales, setSelectedSucursales] = useState<string[]>(
    service.sucursales
  );
  const [showSucursalesDropdown, setShowSucursalesDropdown] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const data = await FetchSucursales();
        setAllSucursales(
          data.filter((sucursal) => sucursal.status === "active")
        ); // Solo sucursales activas
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      }
    };

    fetchSucursales();
  }, []);

  const handleEditService = async (values: IServiceDto) => {
    const response = await updateService(token!, setError, values, service.id);
    if (response) {
      setViewEditService(false);
      handleUpdate();
    }
  };
  const handleSucursalToggle = (sucursal: string) => {
    setSelectedSucursales((prev) => {
      const updated = prev.includes(sucursal)
        ? prev.filter((item) => item !== sucursal)
        : [...prev, sucursal];
      return updated;
    });
    setShowSucursalesDropdown(false); // Cierra el desplegable después de seleccionar una sucursal
  };

  return (
    <Formik
      initialValues={{
        type: service.type,
        price: service.price,
        description: service.description,
        sucursales: selectedSucursales.join(", "),
        vehiculo: service.vehiculo,
      }}
      enableReinitialize
      validate={validateFormServiceEdit}
      onSubmit={async (values) => {
        const updatedValues = {
          ...values,
          sucursales: selectedSucursales, // Usar las sucursales seleccionadas
        };
        await handleEditService(updatedValues);
      }}
    >
      {({ dirty, values, errors, touched }) => {
        const isFormDirty =
          dirty ||
          selectedSucursales.join(", ") !== service.sucursales.join(", ");

        return (
          <Form className="flex w-full gap-3 h-full flex-col">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full flex flex-col">
                <span className="text-custom-white text-sm">Tipo</span>
                <Field
                  type="text"
                  name="type"
                  className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                    ${(errors.type && touched.type) || error ? "error" : ""}
                  `}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="type" />
                </span>
              </div>

              {/* Precio */}
              <div className="w-full flex flex-col">
                <span className="text-custom-white text-sm">Precio</span>
                <Field
                  type="number"
                  name="price"
                  className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                    ${(errors.price && touched.price) || error ? "error" : ""}
                  `}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="price" />
                </span>
              </div>

              {/* Descripción */}
              <div className="w-full flex flex-col">
                <span className="text-custom-white text-sm">Descripción</span>
                <Field
                  as="textarea"
                  name="description"
                  className={`resize-none border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                    ${
                      (errors.description && touched.description) || error
                        ? "error"
                        : ""
                    }
                  `}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="description" />
                </span>
              </div>

              {/* Sucursales */}
              <div className="w-full flex flex-col relative">
                <span className="text-custom-white text-sm">Sucursales</span>
                <div className="">
                  <div className="flex items-center">
                    <Field
                      type="text"
                      name="sucursales"
                      disabled
                      value={selectedSucursales.join(", ")}
                      className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                      ${
                        (errors.sucursales && touched.sucursales) || error
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
                    <ErrorMessage name="sucursales" />
                  </span>
                </div>

                {/* Desplegable de opciones */}
                {showSucursalesDropdown && (
                  <div className="absolute mt-16 w-full max-h-40 overflow-y-auto bg-[#2b2b2b]  border border-neutral-700 rounded">
                    {allSucursales.map(
                      (sucursal) =>
                        sucursal.status === "active" && (
                          <div
                            key={sucursal.id}
                            className={`p-2 cursor-pointer ${
                              selectedSucursales.includes(sucursal.name)
                                ? "bg-gray-600"
                                : ""
                            }`}
                            onClick={() => handleSucursalToggle(sucursal.name)}
                          >
                            {sucursal.name}
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>

              {/* Vehículo */}
              <div className="w-full flex flex-col">
                <span className="text-custom-white text-sm">Vehículo</span>
                <Field
                  type="text"
                  name="vehiculo"
                  className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                    ${
                      (errors.vehiculo && touched.vehiculo) || error
                        ? "error"
                        : ""
                    }
                  `}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="vehiculo" />
                </span>
              </div>
            </div>

            {error ? <p className="text-red-600">¡{error}!</p> : ""}
            <div className="flex h-10 mt-4 justify-center w-full">
              <button
                type="submit"
                className={`bg-custom-red text-custom-white rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red ${
                  !isFormDirty ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormDirty}
              >
                Guardar Cambios
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditFormService;
