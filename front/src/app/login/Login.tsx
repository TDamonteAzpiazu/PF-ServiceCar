import LoginForm from "@/components/forms/LoginForm";
import Opinion from "@/components/forms/Opinion";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Login: React.FC = () => {
  return (
    <main className=" text-custom-white">
      <section className=" w-full flex">
        <div className="md:w-1/2 w-2/3 min-w-72 mx-auto bg-black my-3 bg-opacity-85 flex flex-col py-4">
          <div className="w-3/4 mx-auto">
            <h3 className="text-center text-custom-red sm:text-3xl text-xl font-semibold">
              ¡Bienvenido otra vez!
            </h3>
            <p className="text-custom-grey font-light pt-3 pb-1 sm:text-base text-xs text-center">
              !Gracias por elegirnos, es un placer que nos sigas eligiendo¡
            </p>
            <p className="text-center pb-3 sm:text-base text-xs">
              Inicia sesión con
              <span className="text-custom-red font-semibold"> Email </span> y
              <span className="text-custom-red font-semibold"> Contraseña</span>,
              o con tu cuenta de Google.
            </p>
            <LoginForm />
            <p className="text-center sm:text-base text-xs">
              ¿Aún no tienes una cuenta?
              <Link
                href={PATHROUTES.REGISTER}
                className="pl-1 text-custom-red font-semibold hover:underline"
              >
                !Registrate¡
              </Link>
            </p>
          </div>
        </div>
        <Opinion />
      </section>
    </main>
  );
};

export default Login;
