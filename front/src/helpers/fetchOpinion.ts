import Swal from "sweetalert2";
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

export const deleteOpinion = async (url: string, token: string, id: string) => {
  try {
    const result = await Swal.fire({
      title: "¿Está seguro/a de deshabilitar la opinion?",
      text: "Los usuarios no podrán visualizarla.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deshabilitar.",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${url}/disable/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
return data
      if (response.ok) {
        Swal.fire({
          title: "Deshabilitada",
          text: "La opinion ha sido deshabilitada.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "No se pudo deshabilitar la opinion.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
