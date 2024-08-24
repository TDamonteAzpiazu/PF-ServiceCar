import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { UserSessionProps } from "./helpers/types/types";

const validateJWT = async (
  secret: string | undefined,
  user: UserSessionProps
): Promise<boolean> => {
  try {
    const { payload } = await jwtVerify(
      user.token,
      new TextEncoder().encode(secret)
    );
    console.log(payload);

    if (!payload.id || !payload.iat || !payload.exp) {
      //si no posee el id del usuario  o .iat (fecha creacion) retornamos false
      console.error(
        "Falta el id del usuario o dato de emisión o fecha de expiración:",
        payload
      );
      return false;
    }
    // if (Number(payload.userId) !== Number(user.id)) {
    //   //si el id no coincide retornamos false
    //   console.error("Token inválido:", payload);
    //   return false;
    // }
    return true;
  } catch (error) {
    console.error("JWT Validation Error:", error);
    return false;
  }
};

export const middleware = async (request: NextRequest) => {
  const secret = process.env.SECRET;
  const userData = request.cookies.get("token")?.value; //obtenemos el valor de la cookie
  if (!userData) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const user: UserSessionProps = JSON.parse(userData!);
  if (!user.token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (user.token) {
    if (userData) {
      const validateToken = await validateJWT(secret, user); //validamos el token
      if (validateToken === true) {
        return NextResponse.next();
      }
    }
  }
};

export const config = {
  matcher: ["/user"], //rutas protegidas
};
