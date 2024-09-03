import Swal from "sweetalert2";
import { handleProp, handlePropAppointment, IAppointment } from "./types/types";
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

export const handleSubmitApppoint = async (
  values:IAppointment,
  token:any
) => {
  try {
    if (!token && !values.user) {
      Swal.fire({
        title: "No se pudo crear la reserva",
        text: "Debe iniciar sesión antes.",
        icon: "error",
        html: `<p>¿Desea loguearse? <a href=${PATHROUTES.LOGIN}> INGRESAR</a></p>`,
      });
      return;
    } else {
      Swal.fire({
        title: "Reserva iniciada exitosamente",
        text: `Por favor proceda al pago para confirmar la reserva.`,
        icon: "success",
      });
      return true
    }
  } catch (error) {
    console.log(error)
  }
};
