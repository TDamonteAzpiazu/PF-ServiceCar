"use client";
import {
  getTomorrowDate,
  timeOptions,
  validateAppointment,
} from "@/helpers/validateForms";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import "../../styles/forms.css";
import { IAppointment, IService, IUser } from "@/helpers/types/types";
import { handleSubmitApppoint } from "@/helpers/fetchForms";
import { parse } from "jsonc-parser";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import PATHROUTES from "@/helpers/PathRoutes";

const FormReservations: React.FC<{
  service: IService;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ service, setIsMenuOpen }) => {
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = parse(Cookies.get("token")?.toString() || "{}");
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  const fetchAppointment = async (values: { date: string; time: string }) => {
    try {
      if (!token || !dataUser) {
        Swal.fire({
          title: "No se pudo crear la reserva",
          icon: "error",
          html: `<div>
            <p>Debe iniciar sesión antes de reservar un servicio.</p>
            <br/>
            <p>¿Desea loguearse? <a href=${PATHROUTES.LOGIN}> INGRESAR</a></p>
            </div>`,
        });
        return;
      } else {
        const data: IAppointment = {
          date: values.date,
          service: service.id,
          time: values.time,
          user: dataUser.id,
        };
        const response = await handleSubmitApppoint({
          values: data,
          url: `${url}/appointments`,
          setError: setError,
          token: token,
        });
      
        if (response?.response.ok) {
          setIsMenuOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ date: "", time: "" }}
        validate={validateAppointment}
        onSubmit={async (values) => {
          await fetchAppointment(values);
        }}
      >
        {(formikProps) => (
          <Form className="flex w-full gap-3 h-full flex-col">
            <div className="flex gap-2 w-full">
              <div className="w-1/2 flex flex-col">
                <span className="text-custom-grey text-sm">Fecha</span>
                <Field
                  type="date"
                  name="date"
                  min={getTomorrowDate()}
                  className={`border border-custom-red bg-transparent outline-none py-2 px-3 rounded w-full
                ${
                  (formikProps.errors.date && formikProps.touched.date) || error
                    ? "error"
                    : ""
                }
              `}
                />
                <span style={{ color: "red" }}>
                  <ErrorMessage name="date" />
                </span>
              </div>
              <div className="w-1/2 flex flex-col">
                <span className="text-custom-grey text-sm">Horario</span>
                <Field
                  type="time"
                  name="time"
                  className={`border border-custom-red bg-transparent outline-none py-2 px-3 rounded w-full
                ${
                  (formikProps.errors.time && formikProps.touched.time) || error
                    ? "error"
                    : ""
                }
              `}
                  list="time-options"
                />
                <datalist id="time-options">
                  {timeOptions.map((time, index: number) => (
                    <option key={index} value={time} />
                  ))}
                </datalist>
                <span style={{ color: "red" }}>
                  <ErrorMessage name="time" />
                </span>
              </div>
            </div>
            {error ? <p className="text-red-600">¡{error}!</p> : ""}
            <div className=" flex h-10 mt-4 justify-center w-full">
              <button
                type="submit"
                className="bg-custom-red rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red"
              >
                Reservar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormReservations;
