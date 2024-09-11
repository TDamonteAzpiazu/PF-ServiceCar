import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { IService } from "@/helpers/types/types";
// import { updateService } from "@/helpers/serviciosFetch";

interface ModalServiceFormProps {
  service: IService;
  onClose: () => void;
}

const ServiceEditModal: React.FC<ModalServiceFormProps> = ({ service, onClose }) => {
  const [isModified, setIsModified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Nueva variable para manejar errores

  const validationSchema = Yup.object({
    price: Yup.number().positive("El precio debe ser un número positivo"),
    description: Yup.string(),
  });

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-custom-grey p-8 rounded-lg w-1/2">
        <h2 className="text-xl mb-4">Editar Servicio</h2>
        <Formik
          initialValues={{
            description: service.description || "",
            price: service.price || 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const updatedData: Partial<IService> = {};
            if (values.description !== service.description) {
              updatedData.description = values.description;
            }
            if (values.price !== service.price) {
              updatedData.price = values.price;
            }

            // try {
            //   if (Object.keys(updatedData).length > 0) {
            //     const response = await updateService(service.id, updatedData);
            //     if (response) {
            //       console.log("Servicio actualizado:", response);
            //       onClose(); // Cierra el modal después de la actualización
            //     } else {
            //       setErrorMessage("No se pudo actualizar el servicio. Intenta nuevamente.");
            //     }
            //   }
            // } catch (error) {
            //   setErrorMessage((error as Error).message); // Muestra el mensaje de error
            // }
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => {
            const checkIfModified = () => {
              const modified =
                values.price !== service.price || values.description !== service.description;
              setIsModified(modified);
            };

            return (
              <Form className="flex flex-col gap-4" onChange={checkIfModified}>
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} {/* Muestra el error */}
                
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
                    onChange={handleChange}
                    value={values.description}
                    className="border p-2 w-full rounded"
                  />
                  {touched.description && errors.description ? (
                    <div className="text-red-500">{errors.description}</div>
                  ) : null}
                </div>

                <div>
                  <label className="block mb-2">Precio</label>
                  <Field
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={values.price}
                    className="border p-2 w-full rounded"
                  />
                  {touched.price && errors.price ? (
                    <div className="text-red-500">{errors.price}</div>
                  ) : null}
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
                    disabled={!isModified} // Deshabilita el botón si no se modificaron los campos
                    className={`px-4 py-2 rounded text-white ${
                      isModified ? "bg-custom-red hover:bg-red-600" : "bg-gray-300"
                    }`}
                  >
                    Editar
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ServiceEditModal;
