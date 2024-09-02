import { IAppointment, IService } from "./types/types";

export const createPreference = async (
  url: string | undefined,
  service: IService,
  data: IAppointment,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
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
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const dataRes = await res.json();
    if (res && dataRes) {
        const resReservations = await fetch(`${url}/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        await resReservations.json();
    }
    return dataRes;
  } catch (error: any) {
    console.error("Error creating preference:", error.message);
    throw error;
  }
};
