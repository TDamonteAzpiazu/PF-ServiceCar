import Swal from "sweetalert2";
import { handleProp, handlePropAppointment } from "./types/types";
import PATHROUTES from "./PathRoutes";

export const handleSubmit = async ({
  setError,
  textError,
  textSwal,
  titleSwal,
  url,
  values,
}: handleProp) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: titleSwal,
        text: textSwal,
        icon: "success",
      });

      return { response, data };
    } else {
      setError(data.message || textError);
    }
  } catch (error) {
    setError(textError);
  }
};

export const handleSubmitApppoint = async ({
  setError,
  url,
  values,
  token,
}: handlePropAppointment) => {
  try {
    if (!token && !values.user) {
      Swal.fire({
        title: "No se pudo crear la reserva",
        text: "Debe iniciar sesión antes.",
        icon: "error",
        html: `<p>¿Desea loguearse? <a href=${PATHROUTES.LOGIN}> INGRESAR</a></p>`,
      });
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Reserva gestionada exitosamente",
        text: `Ha creado su reserva para el dia ${values.date} a las ${values.time} horas.`,
        icon: "success",
      });

      return { response, data };
    } else {
      setError(data.message || "Error al crear la reserva");
    }
  } catch (error) {
    setError("Error al crear la reserva");
  }
};
