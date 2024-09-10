import Swal from "sweetalert2";
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

export const deleteSucursal = async (token: string, id: string) => {
  try {
    const result = await Swal.fire({
      title: "¿Está seguro/a de deshabilitar la sucursal?",
      text: "El usuario ya no podra visualizar la misma en la plataforma.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deshabilitar.",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${apiURL}/sucursales/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Deshabilitada",
          text: "La sucursal ha sido deshabilitada.",
          icon: "success",
        });
        return data;
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "No se pudo deshabilitar la sucursal.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Operación cancelada",
        text: "¡La sucursal sigue habilitada!.",
        icon: "info",
      });
    }
  } catch (error) {
    console.error("Error al deshabilitar la sucursal:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo deshabilitar la sucursal.",
      icon: "error",
    });
  }
};
