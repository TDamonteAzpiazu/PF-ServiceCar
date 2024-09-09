import { jwtVerify } from "jose";
import { IUser } from "./types/types";
import Swal from "sweetalert2";

export const fetchDataUserByID = async (
  token: string,
  url: string | undefined,
  id: string | unknown
) => {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error al hacer la peticion: ${response.status}`);
    }
    const data: IUser = await response.json();
    return data;
  } catch (error) {
    console.error("Error al recuperar la informaciòn del user:", error);
    throw error;
  }
};

export const fetchDataUser = async (
  token: string,
  secret: string | undefined,
  url: string | undefined
) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    const data = await fetchDataUserByID(token, url, payload.id);
    return data;
  } catch (error) {
    console.error("Error fetching data user:", error);
    throw error;
  }
};

export const updateUser = async (
  url: string,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  values: { name: string; email: string; address: string }
) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      Swal.fire({
        title: "Actualización correcta",
        text: "Su perfil ha sido actualizado exitosamente.",
        icon: "success",
      });
      return data;
    } else {
      Swal.fire({
        title: "Error",
        text: data.message || "No se pudo editar el perfil.",
        icon: "error",
      });
      return
    }
  } catch (error: any) {
    setError(error.message);
  }
};
