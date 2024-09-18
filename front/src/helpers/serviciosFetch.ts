import Swal from "sweetalert2";
import {
  IService,
  IServiceDto,
  ISucursales,
  ISucursalesDto,
} from "./types/types";

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

export const deleteSucursal = async (token: string, sucursal: ISucursales) => {
  try {
    const result = await Swal.fire({
      title: `${
        sucursal.status === "active"
          ? "¿Está seguro/a de deshabilitar la sucursal?"
          : "¿Está seguro/a de Habilitar la sucursal nuevamente?"
      }`,
      text: `${
        sucursal.status === "active"
          ? "El usuario ya no podra visualizar la misma en la plataforma."
          : "El usuario podra visualizarla nuevamente en la plataforma."
      }
       `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${
        sucursal.status === "active" ? "deshabilitar" : "habilitar"
      }.`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(
        `${apiURL}/sucursales/status/${sucursal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: `${
            sucursal.status === "active" ? "Deshabilitada" : "Habilitada"
          }.`,
          text: `La sucursal ha sido ${
            sucursal.status === "active" ? "deshabilitada" : "habilitada"
          }.`,
          icon: "success",
        });
        return data;
      } else {
        Swal.fire({
          title: "Error",
          text:
            data.message ||
            `No se pudo ${
              sucursal.status === "active" ? "deshabilitar" : "habilitar"
            } la sucursal.`,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Operación cancelada",
        text: `¡La sucursal sigue ${
          sucursal.status === "active" ? "habilitada" : "deshabilitada"
        }!.`,
        icon: "info",
      });
    }
  } catch (error) {
    console.error("Error al deshabilitar la sucursal:", error);
    Swal.fire({
      title: "Error",
      text: `No se pudo ${
        sucursal.status === "active" ? "deshabilitar" : "habilitar"
      } la sucursal.`,
      icon: "error",
    });
  }
};

export const createSucursal = async (
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  values: ISucursalesDto
) => {
  try {
    const response = await fetch(`${apiURL}/sucursales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Sucursal creada exitosamente",
        text: `Ya puede visualizarla en su dashboard.`,
        icon: "success",
      });
    }
    return data;
  } catch (error: any) {
    console.log(error);
    setError(error);
  }
};

export const editSucursal = async (
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  values: ISucursalesDto,
  id: string
) => {
  try {
    const response = await fetch(`${apiURL}/sucursales/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Sucursal editada exitosamente",
        text: `Ya puede visualizar los cambios.`,
        icon: "success",
      });
    }
    return data;
  } catch (error: any) {
    console.log(error);
    setError(error);
  }
};

export const updateService = async (
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  values: IServiceDto,
  id: string
) => {
  try {
    const response = await fetch(`${apiURL}/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Servicio actualizado exitosamente",
        text: "Ya puede visualizar los cambios.",
        icon: "success",
      });
      return data;
    } else {
      setError(
        data.message || "Error al actualizar el servicio. Inténtalo de nuevo."
      );
      return null;
    }
  } catch (error: any) {
    console.log(error);
    setError(error.message || "Error de red. Inténtalo de nuevo.");
    return null;
  }
};

export const createService = async (
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  values: IServiceDto
) => {
  try {
    const response = await fetch(`${apiURL}/services`, {
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
        title: "Servicio creado exitosamente",
        text: `Ya puede visualizarlo en su dashboard.`,
        icon: "success",
      });
    }
    return data;
  } catch (error: any) {
    console.log(error);
    setError(error);
  }
};
