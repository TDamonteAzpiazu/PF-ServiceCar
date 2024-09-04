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
import { createPreference } from "@/helpers/fetchMp";
import WalletMP from "../WalletMP";

const FormReservations: React.FC<{
  service: IService;
}> = ({ service }) => {
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = parse(Cookies.get("token")?.toString() || "{}");
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const fetchAppointment = async (values: {
    date: string;
    time: string;
    // sucursales: string;
  }) => {
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
          service: [service.id],
          time: values.time,
          user: dataUser.id,
          // sucursal: values.sucursales,
        };
        const response = await handleSubmitApppoint(data, token);
        if (response) {
          const preference = await createPreference(
            url,
            service,
            data,
            token,
            setError
          );
          console.log(preference.preferenceId);
          await setPreferenceId(preference.preferenceId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ date: "", time: "", sucursales: "" }}
        validate={validateAppointment}
        onSubmit={async (values) => {
          await fetchAppointment({date:values.date, time:values.time});
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
                  onChange={(e: any) => {
                    formikProps.handleChange(e);
                    setSelectedDate(e.target.value);
                  }}
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
            <div className="w-full flex flex-col">
              <Field
                as="select"
                name="sucursales"
                className={`border border-custom-red bg-transparent outline-none py-2 px-3 rounded w-full
                ${
                  (formikProps.errors.sucursales &&
                    formikProps.touched.sucursales) ||
                  error
                    ? "error"
                    : ""
                }
              `}
              >
                <option
                  value=""
                  label={"Seleccione una sucursal"}
                  className=" bg-[#2b2b2b]"
                />
                {service.sucursales.map((option) => (
                  <option
                    key={option}
                    value={option}
                    label={option}
                    className=" bg-[#2b2b2b] "
                  />
                ))}
              </Field>
              <span style={{ color: "red" }}>
                <ErrorMessage name="sucursales" />
              </span>
            </div>
            {error ? <p className="text-red-600">¡{error}!</p> : ""}
            <div className=" flex h-10 mt-4 justify-center w-full">
              <button
                type="submit"
                className="bg-custom-red rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red"
              >
                {selectedDate ? `Reservar para ${selectedDate}` : "Reservar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <WalletMP preferenceId={preferenceId} />
    </div>
  );
};

export default FormReservations;
