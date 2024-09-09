"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { validarRegister } from "@/helpers/validateForms";
import "../../styles/forms.css";
import ContainerInput from "./ContainerInput";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/helpers/fetchForms";
import PATHROUTES from "@/helpers/PathRoutes";
import { IUserRegister, IUserSend } from "@/helpers/types/types";
import ButtonGoogle from "./ButtonGoogle";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import ButtonLogin from "./ButtonLogin";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const dataUser = useSelector((state: any) => state.user.user);
  const { status } = useSession();

  const handleSubmitRegister = async (values: IUserRegister) => {
    setLoading(true);
    try {
      const valuesSend: IUserSend = {
        name: values.name + " " + values.surname,
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
    } catch (error) {
      console.log(error);
      setError("Error al registrar un usuario. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataUser && status === "authenticated") {
      router.push(PATHROUTES.LANDING);
    }
  }, [dataUser, status]);

  return (
    <div className="cont-form">
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
              {/* <button
                type="submit"
                className="bg-custom-red text-custom-white rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-red-600 hover:text-custom-white text-sm py-1.5 px-4"
              >
                Registrar
              </button> */}
              <ButtonLogin loading={loading} name="Registrar" />
              <ButtonGoogle login={false} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
