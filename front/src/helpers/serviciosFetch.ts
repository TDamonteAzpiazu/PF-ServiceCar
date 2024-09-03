import { IService, ISucursales } from "./types/types";

const apiURL = process.env.NEXT_PUBLIC_URL;

export const FetchServicio = async () => {
  try {
    const res = await fetch(`${apiURL}/services`, {
      method: "GET",
      next: { revalidate: 3600 }, //opcion de revalidacion
    });
    const servicios: IService[] = await res.json();
    return servicios;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchDataService = async (
  url: string | undefined,
  id: string | unknown
) => {
  try {
    const response = await fetch(`${url}/services/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error al hacer la peticion: ${response.status}`);
    }
    const data: IService = await response.json();
    return data;
  } catch (error) {
    console.error("Error al recuperar la informaciòn del servicio:", error);
    throw error;
  }
};

export const FetchSucursales = async () => {
  try {
    const res = await fetch(`${apiURL}/sucursales`, {
      method: "GET",
      next: { revalidate: 3600 }, 
    });
    const sucursales: ISucursales[] = await res.json();
    return sucursales;
  } catch (error: any) {
    throw new Error(error);
  }
};
