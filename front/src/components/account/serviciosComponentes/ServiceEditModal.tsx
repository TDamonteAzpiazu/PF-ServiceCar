import React, { useEffect, useState } from "react";
import { IService } from "@/helpers/types/types";
import { Field, Form, Formik } from "formik";
import { FetchSucursales } from "@/helpers/serviciosFetch";

interface ServiceEditModalProps {
  service: IService;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceEditModal: React.FC<ServiceEditModalProps> = ({ service, isOpen, onClose }) => {
  const [allSucursales, setAllSucursales] = useState<string[]>([]); // Todas las sucursales disponibles

  // Fetch sucursales when the modal opens
  useEffect(() => {
    if (isOpen) {
      FetchSucursales().then((data) => setAllSucursales(data.map((s) => s.name)));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-custom-grey p-6 rounded w-1/3">
        <h2 className="text-xl mb-4">Editar Servicio</h2>
        <Formik
          initialValues={{
            type: service.type,
            description: service.description,
            price: service.price,
            sucursal: service.sucursales[0] || "",
          }}
          onSubmit={(values) => {
            console.log(values); // No validamos ni enviamos por ahora
          }}
        >
          {({ handleChange, values }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">Tipo de servicio</label>
                <Field
                  type="text"
                  name="type"
                  disabled
                  value={values.type}
                  className="border rounded text-black p-2 w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1">Descripción</label>
                <Field
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                  className="border rounded text-black p-2 w-full"
                />
              </div>

              <div>
                <label className="block mb-1">Precio</label>
                <Field
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                  className="border rounded text-black p-2 w-full"
                />
              </div>

              {/* Input que muestra las sucursales asociadas separadas por coma */}
              <div>
                <label className="block mb-1">Sucursales asociadas</label>
                <input
                  type="text"
                  value={service.sucursales.join(", ")}  // Muestra las sucursales asociadas separadas por coma
                  readOnly
                  className="border rounded p-2 text-black w-full bg-gray-100"
                />
              </div>

              {/* Menú desplegable con opciones de sucursales */}
              <div>
                <label className="block mb-1">Seleccionar nueva sucursal</label>
                <Field as="select" name="sucursal" className="border rounded p-2 text-black w-full">
                  <option value="">Seleccione una sucursal</option>
                  {allSucursales.map((sucursal, index) => (
                    <option
                      key={index}
                      value={sucursal}
                      // Deshabilita las opciones ya asociadas al servicio y las sombrea
                      disabled={service.sucursales.includes(sucursal)}
                      style={{
                        backgroundColor: service.sucursales.includes(sucursal)
                          ? "#d3d3d3" // Color para sucursales ya asociadas
                          : "#fff"
                      }}
                    >
                      {sucursal}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-black"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2  rounded bg-custom-red text-white"
                >
                  Editar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ServiceEditModal;
