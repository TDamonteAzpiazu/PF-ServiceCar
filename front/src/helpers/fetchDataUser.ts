import { jwtVerify } from "jose";
import { IUser } from "./types/types";
import { parse } from "jsonc-parser";
import Cookies from "js-cookie";

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

export const getToken = () => {
  const tokenString = Cookies.get("token");
  if (tokenString) {
    try {
      const parsedToken = parse(tokenString);
      return parsedToken ? parsedToken.toString() : null;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  }
  return null;
};
