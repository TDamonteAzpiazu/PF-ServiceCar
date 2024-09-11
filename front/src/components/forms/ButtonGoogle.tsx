"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const ButtonGoogle: React.FC<{
  login: boolean;
 
}> = ({ login }) => {
  return (
    <button
      onClick={() => signIn()}
      type="button"
      className="border flex items-center mt-2 gap-1 justify-center border-custom-red rounded-md md:text-base  md:px-5 hover:cursor-pointer hover:bg-custom-red hover:text-custom-white text-xs py-2 px-4"
    >
      <span>
        <FcGoogle />
      </span>
      {login ? "Ingresar con Google" : " Registrarse con Google"}
    </button>
  );
};

export default ButtonGoogle;
