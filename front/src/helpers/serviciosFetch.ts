import { IService, ISucursales } from "./types/types";
import Swal from "sweetalert2";

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
//nuevo

export const UpdateServiceStatus = async (id: string, newStatus: string) => {
  try {
    const res = await fetch(`${apiURL}/services/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
      throw new Error(`Error actualizando el servicio: ${res.status}`);
    }
    const updatedService: IService = await res.json();
    return updatedService;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const addService = async (
  url: string | undefined,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  serviceData: {
    type: string;
    description: string;
    price: number;
    vehiculo: string;
    sucursales: string[];
  }
) => {
  try {
    const response = await fetch(`${url}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Servicio agregado",
        text: "El servicio ha sido agregado correctamente.",
        icon: "success",
      });
      return data;
    } else {
      Swal.fire({
        title: "Error",
        text: data.message || "No se pudo agregar el servicio.",
        icon: "error",
      });
      return;
    }
  } catch (error: any) {
    setError(error.message);
  }
};

export const updateService = async (id: string, updatedData: Partial<Omit<IService, 'id' | 'status'>>) => {
  try {
    const res = await fetch(`${apiURL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`No se pudo encontrar el servicio con id '${id}'`);
      }
      if (res.status === 400) {
        const errorData = await res.json();
        if (errorData.message.includes('inactive')) {
          throw new Error(`El servicio con id '${id}' está inactivo y no puede ser actualizado`);
        }
        throw new Error(`Error al actualizar el servicio: ${errorData.message}`);
      }
      throw new Error(`Error desconocido: ${res.status}`);
    }

    //actualiz del servicio
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error actualizando servicio:", error);
    return null;
  }
};



