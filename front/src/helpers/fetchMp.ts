import Swal from "sweetalert2";
import { IAppointment, IService } from "./types/types";

export const createPreference = async (
  url: string | undefined,
  service: IService,
  data: IAppointment,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const resReservations = await fetch(`${url}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const appointmentRes = await resReservations.json();
    if (appointmentRes.message === "No puedes tener más de 4 turnos activos") {
      Swal.fire({
        title: "No se ha reservado el servicio",
        text: appointmentRes.message,
        icon: "error",
      });
      return;
    } else {
      Swal.fire({
        title: "Reserva iniciada exitosamente",
        text: `Por favor proceda al pago para confirmar la reserva.`,
        icon: "success",
      });
      const res = await fetch(`${url}/mercadopago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: service.id,
              service: service.type,
              price: service.price,
              idAppointment: appointmentRes.id,
            },
          ],
        }),
      });
      const dataRes = await res.json();
      return dataRes;
    }
  } catch (error: any) {
    console.error("Error creating preference:", error.message);
    setError(error.message);
    throw error;
  }
};
