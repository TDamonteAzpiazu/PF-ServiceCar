import { jwtVerify } from "jose";
import { IUser } from "./types/types";

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

    const response = await fetch(`${url}/users/${payload.id}`, {
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
    console.error("Error fetching data user:", error);
    throw error;
  }
};

