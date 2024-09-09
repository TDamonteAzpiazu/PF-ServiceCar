"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { validarLogin } from "@/helpers/validateForms";
import "../../styles/forms.css";
import ContainerInput from "./ContainerInput";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/helpers/fetchForms";
import PATHROUTES from "@/helpers/PathRoutes";
import { IUserLogin, TokenProps } from "@/helpers/types/types";
import ButtonLogin from "./ButtonLogin";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserData } from "@/redux/userSlice";
import { fetchDataUser } from "@/helpers/fetchDataUser";
import { useSession } from "next-auth/react";
import ButtonGoogle from "./ButtonGoogle";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const url = process.env.NEXT_PUBLIC_URL;
  const dataUser = useSelector((state: any) => state.user.user);
  const { status } = useSession();
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
        fetchDataUser(userData.token, secret, url).then((res) => {
          dispatch(setUserData(res));
        });
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

  useEffect(() => {
    if (dataUser && status === "authenticated") {
      router.push(PATHROUTES.LANDING);
    }
  }, [dataUser, status]);

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
              <ButtonLogin loading={loading} name="Ingresar" />
              <ButtonGoogle login={true} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
