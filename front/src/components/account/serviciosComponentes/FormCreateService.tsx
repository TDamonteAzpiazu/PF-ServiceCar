"use client";
import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ISucursales, IServiceDto, IService } from "@/helpers/types/types";
import {
  createService,
  FetchServicio,
  FetchSucursales,
} from "@/helpers/serviciosFetch";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { validateFormService } from "@/helpers/validateForms";

const FormCreateService: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setServicios: React.Dispatch<React.SetStateAction<IService[]>>;
}> = ({ setIsModalOpen, setServicios }) => {
  const [error, setError] = useState<string | null>(null);
  const [allSucursales, setAllSucursales] = useState<ISucursales[]>([]);
  const [selectedSucursales, setSelectedSucursales] = useState<string[]>([]);
  const [showSucursalesDropdown, setShowSucursalesDropdown] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const data = await FetchSucursales();
        setAllSucursales(data);
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      }
    };
    fetchSucursales();
  }, []);

  const handleCreateService = async (values: IServiceDto) => {
    const response = await createService(token!, setError, values);
    if (response) {
      const data = await FetchServicio();
      setServicios(data);
      setIsModalOpen(false);
      Swal.fire({
        title: "Servicio creado exitosamente",
        text: `El servicio ya está disponible.`,
        icon: "success",
      });
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
        type: "",
        price: "",
        description: "",
        sucursales: selectedSucursales,
        vehiculo: "",
      }}
      validate={validateFormService(selectedSucursales)}
      onSubmit={async (values, { setErrors }) => {
        if (selectedSucursales.length === 0) {
          setErrors({ sucursales: "La sucursal es requerida" });
          return;
        }
        const updatedValues: IServiceDto = {
          ...values,
          price: parseFloat(values.price),
          sucursales: selectedSucursales,
        };
        await handleCreateService(updatedValues);
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="flex w-full gap-3 h-full flex-col">
          {/* Tipo */}
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

            {/* Desplegable de opciones */}
            {showSucursalesDropdown && (
              <div className="absolute top-full mt-2 w-full max-h-40 overflow-y-auto bg-[#2b2b2b] border border-neutral-700 rounded z-10">
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

          <div className="w-full flex flex-col">
            <span className="text-custom-white text-sm">Vehículo</span>
            <Field
              as="select"
              name="vehiculo"
              className={`border-[1.8px] border-neutral-700 bg-transparent outline-none py-2 px-3 rounded w-full
                ${(errors.vehiculo && touched.vehiculo) || error ? "error" : ""}
              `}
            >
              <option
                value=""
                label="Selecciona un vehículo"
                className="bg-[#2b2b2b] text-custom-grey"
              />
              <option
                value="Auto"
                label="Auto"
                className="bg-[#2b2b2b] text-custom-white"
              />
              <option
                value="Moto"
                label="Moto"
                className="bg-[#2b2b2b] text-custom-white"
              />
              <option
                value="Camion"
                label="Camion"
                className="bg-[#2b2b2b] text-custom-white"
              />
            </Field>
            <span style={{ color: "red" }}>
              <ErrorMessage name="vehiculo" />
            </span>
          </div>

          <div className="flex h-10 mt-4 justify-center w-full">
            <button
              type="submit"
              className="bg-custom-red rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red"
            >
              Crear Servicio
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormCreateService;
