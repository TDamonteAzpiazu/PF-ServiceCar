"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { validarRegister } from "@/helpers/validateForms";
import "../../styles/forms.css";
import ContainerInput from "./ContainerInput";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/helpers/fetchForms";
import PATHROUTES from "@/helpers/PathRoutes";
import { FcGoogle } from "react-icons/fc";
import { IUserRegister, IUserSend } from "@/helpers/types/types";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;

  const handleSubmitRegister = async (values: IUserRegister) => {
    const valuesSend: IUserSend = {
      name: values.name + values.surname,
      email: values.email,
      address: values.address,
      password: values.password,
      repeatPassword: values.repeatPassword,
    };
    const response = await handleSubmit({
      setError: setError,
      textError: "Error al registrar un usuario. Intentelo nuevamente.",
      textSwal: "Haz completado el registro correctamente!",
      titleSwal: "Registro exitoso",
      url: `${url}/auth/signup`,
      values: valuesSend,
    });
    if (response?.response.ok) {
      router.push(PATHROUTES.LOGIN);
    } else {
      throw new Error("Error al crear un usuario");
    }
  };
  return (
    <div className="cont-form ">
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          repeatPassword: "",
          address: "",
        }}
        validate={validarRegister}
        onSubmit={async (values) => {
          try {
            await handleSubmitRegister(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <Form className="flex flex-col items-start">
            <div className="flex gap-2 w-full">
              <ContainerInput
                error={error}
                formikProps={formikProps}
                nombre="name"
                title="Nombre"
                type="text"
              />
              <ContainerInput
                error={error}
                formikProps={formikProps}
                nombre="surname"
                title="Apellido"
                type="text"
              />
            </div>

            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="email"
              title="Email"
              type="email"
            />

            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="address"
              title="Dirección propia"
              type="text"
            />
            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="password"
              title="Contraseña"
              type="password"
            />
            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="repeatPassword"
              title="Repita la contraseña"
              type="password"
            />

            {error && (
              <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
            )}
            <div className="cont-btn flex flex-col w-full justify-center mb-5">
              <button
                type="submit"
                className=" bg-custom-red  text-custom-white  rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-red-600 hover:text-custom-white text-sm py-1.5 px-4"
              >
                Registrar
              </button>
              <button className="border flex items-center mt-2 gap-1 justify-center border-custom-red rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-custom-red hover:text-custom-white text-xs py-1.5 px-4">
                <span>
                  <FcGoogle />
                </span>
                Registrarme con Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
