"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IUser } from "@/helpers/types/types";
import { validarUpdateUser } from "@/helpers/validateForms";
import { updateUser } from "@/helpers/fetchDataUser";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/userSlice";
import "../../styles/forms.css";

const FormUpdateUser: React.FC<{
  dataUser: IUser;
  viewUpdateUser: boolean;
  setViewUpdateUser: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ dataUser, setViewUpdateUser, viewUpdateUser }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;

  const handlerUpdateUser = async (values: {
    name: string;
    email: string;
    address: string;
  }) => {
    try {
      const data = await updateUser(
        `${url}/users/${dataUser.id}`,
        token!,
        setError,
        values
      );
      if (data) {
        dispatch(setUserData(data));
        setViewUpdateUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: dataUser.name,
        email: dataUser.email,
        address: dataUser.address || "Av. San martin 123",
      }}
      validate={validarUpdateUser}
      onSubmit={async (values) => {
        await handlerUpdateUser(values);
      }}
    >
      {({ dirty, errors, touched }) => (
        <Form className="flex w-full gap-3 h-full flex-col">
          <div className="flex gap-2 w-full">
            <div className="w-1/2 flex flex-col">
              <span className="text-custom-white text-sm">
                Nombre completo:
              </span>
              <Field
                type="text"
                name="name"
                className={`border text-custom-white border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                  (errors.name && touched.name) || error ? "error" : ""
                }`}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="name" />
              </span>
            </div>
            <div className="w-1/2 flex flex-col">
              <span className="text-custom-white text-sm">Email:</span>
              <Field
                type="text"
                name="email"
                className={`border text-custom-white border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                  (errors.email && touched.email) || error ? "error" : ""
                }`}
              />

              <span style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-custom-white text-sm">Dirección:</span>
            <Field
              type="text"
              name="address"
              className={`border text-custom-white border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                (errors.address && touched.address) || error ? "error" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              <ErrorMessage name="address" />
            </span>
          </div>
          {error ? <p className="text-red-600">¡{error}!</p> : ""}
          <div className="flex h-10 mt-4 justify-center w-full">
            <button
              type="submit"
              className={`bg-custom-red text-custom-white rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red ${
                !dirty ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!dirty}
            >
              Editar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormUpdateUser;
