import { handleSubmit } from "@/helpers/fetchForms";
import { IUserSend } from "@/helpers/types/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const ButtonGoogle: React.FC<{
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  url: string | undefined;
}> = ({ setError, url }) => {
  const { isLoading, error, user } = useUser();

  return (
    <Link
      href="/api/auth/login"
      className="border flex items-center mt-2 gap-1 justify-center border-custom-red rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-custom-red hover:text-custom-white text-xs py-1.5 px-4"
    >
      <span>
        <FcGoogle />
      </span>
      Registrarse con Google
    </Link>
  );
};

export default ButtonGoogle;
