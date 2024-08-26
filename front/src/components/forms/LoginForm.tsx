"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { validarLogin } from "@/helpers/validateForms";
import "../../styles/forms.css";
import ContainerInput from "./ContainerInput";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/helpers/fetchForms";
import PATHROUTES from "@/helpers/PathRoutes";
import { FcGoogle } from "react-icons/fc";
import { IUserLogin, TokenProps } from "@/helpers/types/types";
import ButtonLogin from "./ButtonLogin";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "@/redux/userSlice";
import { fetchDataUser } from "@/helpers/fetchDataUser";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const url = process.env.NEXT_PUBLIC_URL;

  const handleSubmitLogin = async (values: IUserLogin) => {
    setLoading(true);

    try {
      const response = await handleSubmit({
        setError: setError,
        textError: "Error al iniciar sesión. Intentelo nuevamente.",
        textSwal: "Haz completado el login correctamente!",
        titleSwal: "Inicio de sesión exitoso!",
        url: `${url}/auth/signin`,
        values: values,
      });

      if (response?.data.success === "Autenticación exitosa") {
        const userData: TokenProps = {
          token: response.data.token,
        };

        dispatch(setToken(userData.token));
        fetchDataUser(userData.token, secret, url)
        .then((res) => {
          dispatch(setUserData(res));
        })
        router.push(PATHROUTES.LANDING);
      } else {
        throw new Error("Error al loguear un usuario");
      }
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cont-form pt-3">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validarLogin}
        onSubmit={async (values) => {
          try {
            await handleSubmitLogin(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <Form className="flex flex-col items-start">
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
              nombre="password"
              title="Contraseña"
              type="password"
            />

            {error && (
              <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
            )}
            <div className="cont-btn flex flex-col w-full justify-center mb-5">
              <ButtonLogin loading={loading} />
              <button className="border flex items-center mt-2 gap-1 justify-center border-custom-red rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-custom-red hover:text-custom-white text-xs py-1.5 px-4">
                <span>
                  <FcGoogle />
                </span>
                Iniciar sesión con Google
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
