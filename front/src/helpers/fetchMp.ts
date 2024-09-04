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
    if (appointmentRes) {
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
    } else {
      throw new Error(`HTTP error! Status: ${resReservations.status}`);
    }
  } catch (error: any) {
    console.error("Error creating preference:", error.message);
    setError(error.message)
    throw error;
  }
};
