import LoginForm from "@/components/forms/LoginForm";
import Opinion from "@/components/forms/Opinion";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Login: React.FC = () => {
  return (
    <main className=" text-custom-white">
      <section className=" w-full flex">
        <div className="w-1/2 bg-black mt-3 bg-opacity-85 flex flex-col pt-4">
          <div className="w-3/4 mx-auto">
            <h3 className="text-center text-custom-red text-3xl font-semibold">
              ¡Bienvenido otra vez!
            </h3>
            <p className="text-custom-grey font-light pt-3 pb-1 text-center">
              !Gracias por elegirnos, es un placer que nos sigas eligiendo¡
            </p>
            <p className="text-center pb-3">
              Inicia sesión con
              <span className="text-custom-red font-semibold"> Email </span> y
              <span className="text-custom-red font-semibold"> Contraseña</span>,
              o con tu cuenta de Google.
            </p>
            <LoginForm />
            <p className="text-center">
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
