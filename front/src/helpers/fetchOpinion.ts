import Swal from "sweetalert2";
import { IOpinionUser } from "./types/types";
export const createOpinion = async (
  url: string,
  token: string,
  values: any
) => {
  try {
    const response = await fetch(`${url}/reviews`, {
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
        title: "Opinion creada exitosamente",
        text: `Ya puede visualizarla en su dashboard.`,
        icon: "success",
      });
    }
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getOpinionsUser = async (
  url: string,
  token: string,
  id: string
) => {
  try {
    const response = await fetch(`${url}/reviews/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOpinions = async (url: string, token: string) => {
  try {
    const response = await fetch(`${url}/reviews`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOpinionsAdmin = async (
  url: string,
  token: string,
  id: string
) => {
  try {
    const response = await fetch(`${url}/admindash/reviewsByService/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.message === "No reviews found for this service.") {
      return [];
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOpinion = async (
  url: string,
  token: string,
  opinion: IOpinionUser
) => {
  try {
    const result = await Swal.fire({
      title: `¿Está seguro/a de ${
        opinion.status === "active" ? "deshabilitar" : "habilitar"
      } la opinion?`,
      text: `Los usuarios ${
        opinion.status === "active" ? "no podrán" : "podrán"
      } visualizarla.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${
        opinion.status === "active" ? "deshabilitar" : "habilitar"
      }.`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${url}/reviews/disable/${opinion.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: `${
            opinion.status === "active" ? "Deshabilitada" : "Habilitada"
          }`,
          text: `La opinion ha sido ${
            opinion.status === "active" ? "deshabilitada" : "habilitada"
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
              opinion.status === "active" ? "deshabilitar" : "habilitar"
            } la opinion.`,
          icon: "error",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
