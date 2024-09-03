import { IAppointment, IService } from "./types/types";

export const createPreference = async (
  url: string | undefined,
  service: IService,
  data: IAppointment,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const resReservations = await fetch('${url}/appointments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ${token}',
      },
      body: JSON.stringify(data),
    });
    // Imprime el contenido de la respuesta para depuración
    const textReservations = await resReservations.text();
    console.log('Response from /appointments:', textReservations);

    const appointmentRes = JSON.parse(textReservations);

    if (appointmentRes) {
      const res = await fetch('${url}/mercadopago', {
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

            // Imprime el contenido de la respuesta para depuración
            const textMercadoPago = await res.text();
            console.log('Response from /mercadopago:', textMercadoPago);
            const dataRes = JSON.parse(textMercadoPago);
      // const dataRes = await res.json();
      return dataRes;
    } else {
      throw new Error('HTTP error! Status: ${resReservations.status}');
    }
  } catch (error: any) {
    console.error("Error creating preference:", error.message);
    throw error;
  }
};