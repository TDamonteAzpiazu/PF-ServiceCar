import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ISucursales } from "@/helpers/types/types";
import { FaChevronDown } from "react-icons/fa";
import { addService, FetchSucursales } from "@/helpers/serviciosFetch";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const ServiceSchema = Yup.object().shape({
  type: Yup.string().required("Requerido"),
  description: Yup.string().required("Requerido"),
  price: Yup.number()
    .required("Requerido")
    .positive("Debe ser positivo"),
  vehiculo: Yup.string()
    .oneOf(["auto", "moto", "camion"], "Selecciona un vehículo válido")
    .required("Requerido"),
  sucursales: Yup.array()
    .min(1, "Selecciona al menos una sucursal")
    .required("Requerido"),
});

const ServiceForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [sucursales, setSucursales] = useState<ISucursales[]>([]);
  const [selectedSucursales, setSelectedSucursales] = useState<ISucursales[]>([]);
  const [showSucursales, setShowSucursales] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const data = await FetchSucursales();
        setSucursales(data);
      } catch (error) {
        console.error("Error fetching sucursales:", error);
      }
    };
    fetchSucursales();
  }, []);

  const handleSelectSucursal = (sucursal: ISucursales) => {
    if (selectedSucursales.some((s) => s.id === sucursal.id)) {
      setSelectedSucursales(
        selectedSucursales.filter((s) => s.id !== sucursal.id)
      );
    } else if (selectedSucursales.length < 3) {
      setSelectedSucursales([...selectedSucursales, sucursal]);
    } else {
      alert("Solo puedes seleccionar hasta 3 sucursales.");
    }
  };

  const getSelectedSucursalesNames = () => {
    return selectedSucursales.map((sucursal) => sucursal.name).join(", ");
  };

  const handleSubmit = async (values: {
    type: string;
    description: string;
    price: number;
    vehiculo: string;
    sucursales: string[];
  }) => {
    console.log("Valores del formulario:", values);
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de agregar este nuevo servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const serviceData = {
          ...values,
          sucursales: selectedSucursales.map((sucursal) => sucursal.id),
        };

        console.log("Datos del servicio a agregar:", serviceData);

        const addedService = await addService(url, token!, setError, serviceData);

        if (addedService) {
          Swal.fire(
            "Servicio agregado",
            "El servicio ha sido agregado correctamente.",
            "success"
          );
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error("Error agregando el servicio:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al agregar el servicio. Inténtalo de nuevo.",
          "error"
        );
      }
    }
  };

  return (
    <Formik
      initialValues={{
        type: "",
        description: "",
        price: 0,
        vehiculo: "",
        sucursales: [],
        image: null,
      }}
      validationSchema={ServiceSchema}
      onSubmit={async (values) => await handleSubmit(values)}
    >
      {() => (
        <Form className="flex flex-col gap-4 my-3 h-[500px]">
          <div>
            <span className="block">Tipo de servicio:</span>
            <Field
              name="type"
              className="input-field p-1 w-full rounded-lg text-black"
            />
            <ErrorMessage name="type" component="div" className="text-red-500" />
          </div>

          <div>
            <span className="block">Descripción:</span>
            <Field
              name="description"
              as="textarea"
              className="input-field p-3 w-full h-28 rounded-lg text-black"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <span className="block">Precio:</span>
            <Field
              name="price"
              type="number"
              className="input-field p-1 w-full rounded-lg text-black"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <span className="block">Vehículo:</span>
            <Field
              as="select"
              name="vehiculo"
              className="input-field p-1 w-full rounded-lg text-black"
            >
              <option value="">Selecciona un vehículo</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              <option value="camion">Camión</option>
            </Field>
            <ErrorMessage
              name="vehiculo"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <span className="block">Sucursales (selecciona al menos una):</span>
            <div
              className="relative cursor-pointer flex items-center justify-between border p-2 rounded-lg"
              onClick={() => setShowSucursales(!showSucursales)}
            >
              <span className="text-black">
                {getSelectedSucursalesNames() || "Selecciona sucursales"}
              </span>
              <FaChevronDown
                className={`transition-transform ${
                  showSucursales ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {showSucursales && (
              <div className="mt-2 border p-2 rounded-lg max-h-32 overflow-y-scroll">
                {sucursales.map((sucursal) => (
                  <div
                    key={sucursal.id}
                    onClick={() => handleSelectSucursal(sucursal)}
                    className={`cursor-pointer p-2 ${
                      selectedSucursales.some((s) => s.id === sucursal.id)
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    {sucursal.name}
                  </div>
                ))}
                <ErrorMessage
                  name="sucursales"
                  component="div"
                  className="text-red-500"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mb-3">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ServiceForm;
