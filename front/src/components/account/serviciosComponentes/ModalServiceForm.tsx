import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { IService, ISucursales } from "@/helpers/types/types";
import { FetchSucursales } from "@/helpers/serviciosFetch";

interface ModalServiceFormProps {
  service: IService;
  onClose: () => void;
}

const ModalServiceForm: React.FC<ModalServiceFormProps> = ({ service, onClose }) => {
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);

  // Fetch sucursales on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchSucursales();
        setSucursales(data);
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-xl mb-4">Editar Servicio</h2>
        <Formik
          initialValues={{
            description: service.description,
            price: service.price,
            sucursal: service.sucursales || "",
          }}
          onSubmit={() => {}}
        >
          {() => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block mb-2">Tipo de Servicio</label>
                <Field
                  type="text"
                  name="type"
                  value={service.type}
                  disabled
                  className="border p-2 w-full rounded bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-2">Descripción</label>
                <Field
                  type="text"
                  name="description"
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Precio</label>
                <Field
                  type="number"
                  name="price"
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="block mb-2">Sucursal</label>
                <Field as="select" name="sucursal" className="border p-2 w-full rounded">
                  <option value="">Seleccione una sucursal</option>
                  {sucursales.map((sucursal) => (
                    <option key={sucursal.id} value={sucursal.id}>
                      {sucursal.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default ModalServiceForm;
