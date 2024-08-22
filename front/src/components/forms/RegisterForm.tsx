"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { validarRegister } from "@/helpers/validateForms";
import "../../styles/forms.css";
import ContainerInput from "./ContainerInput";
import { useRouter } from "next/navigation";
// import { handleSubmit } from "@/helpers/fetchForms";
import PATHROUTES from "@/helpers/PathRoutes";
import { FcGoogle } from "react-icons/fc";
// import { IUser } from "@/helpers/types";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;

  //   const handleSubmitRegister = async (values: IUser) => {
  //     const response = await handleSubmit({
  //       setError: setError,
  //       textError: "Error al registrar un usuario. Intentelo nuevamente.",
  //       textSwal: "Haz completado el registro correctamente!",
  //       titleSwal: "Registro exitoso",
  //       url: `${url}/users/register`,
  //       values: values,
  //     });
  //     if (response?.response.ok) {
  //       router.push(PATHROUTES.LOGIN);
  //     } else {
  //       throw new Error("Error al crear un usuario");
  //     }
  //   };
  return (
    <div className="cont-form ">
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          address: "",
          phone: "",
        }}
        validate={validarRegister}
        onSubmit={async (values) => {
          try {
            // await handleSubmitRegister(values);
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
              nombre="phone"
              title="Teléfono"
              type="text"
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
            <div className="cont-input pb-5 flex flex-col">
              <label htmlFor="profileImg" className="font-extralight pb-1">Imagen de perfil: (opcional)</label>
              <input
                type="file"
                name="profileImg"
                accept="image/*"
                id="profileImg"
                onChange={(event) => {
                  formikProps.setFieldValue(
                    "profileImg",
                    event.target.files && event.target.files[0]
                  );
                }}
              />
            </div>

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
