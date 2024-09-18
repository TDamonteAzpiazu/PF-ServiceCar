"use client";

import { IAppointmentUser, IService } from "@/helpers/types/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  getTomorrowDate,
  timeOptions,
  validateAppointmentUpdate,
} from "@/helpers/validateForms";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import PATHROUTES from "@/helpers/PathRoutes";
import { updateAppointment } from "@/helpers/fetchReservations";
import "../../styles/forms.css";

const FormUpdateReservation: React.FC<{
  appointment: IAppointmentUser;
  servicios: IService[];
  setViewIappointmentUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAppointments: () => Promise<void>;
}> = ({
  appointment,
  servicios,
  setViewIappointmentUpdate,
  fetchAppointments,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [sucursales, setSucursales] = useState<string[]>([]);
  const token = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_URL;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <Formik
      initialValues={{
        date: formatDate(appointment.date),
        time: appointment.time,
        servicios: undefined,
        sucursal: undefined,
      }}
      validate={validateAppointmentUpdate}
      onSubmit={async (values) => {
        const res = await updateAppointment(
          `${url}/appointments/${appointment.id}`,
          token!,
          values,
          appointment,
          setError
        );
        await fetchAppointments();
        if (res) setViewIappointmentUpdate(false);
      }}
    >
      {({ dirty, handleChange, errors, touched, setFieldValue }) => (
        <Form className="flex w-full gap-3 h-full flex-col">
          <div className="flex gap-2 w-full">
            <div className="w-1/2 flex flex-col">
              <span className="text-custom-white text-sm">Fecha</span>
              <Field
                type="date"
                name="date"
                min={getTomorrowDate()}
                className={`border border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                  (errors.date && touched.date) || error ? "error" : ""
                }`}
                onChange={(e: any) => {
                  handleChange(e);
                  setSelectedDate(e.target.value);
                }}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="date" />
              </span>
            </div>
            <div className="w-1/2 flex flex-col">
              <span className="text-custom-white text-sm">Horario</span>
              <Field
                type="time"
                name="time"
                className={`border border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                  (errors.time && touched.time) || error ? "error" : ""
                }`}
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
            <span className="text-custom-white text-sm">Servicios</span>
            <Field
              as="select"
              name="servicios"
              className={`border border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                (errors.servicios && touched.servicios) || error ? "error" : ""
              }`}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
                const selectedServiceId = e.target.value;
                setSelectedService(selectedServiceId);

                const service = servicios.find(
                  (service) => service.id === selectedServiceId
                );
                if (service) {
                  setSucursales(service.sucursales);
                } else {
                  setSucursales([]);
                  setFieldValue("sucursales", "");
                }
              }}
            >
              <option
                value=""
                label="Seleccione nuevos servicios"
                className="bg-[#2b2b2b]"
              />
              {servicios.map(
                (option) =>
                  option.status === "active" && (
                    <option
                      key={option.id}
                      value={option.id}
                      label={option.type}
                      className="bg-[#2b2b2b]"
                    />
                  )
              )}
            </Field>
            {selectedService && (
              <div className="w-full flex flex-col mt-4">
                <span className="text-custom-white text-sm">Sucursal</span>
                <Field
                  as="select"
                  name="sucursal"
                  className={`border border-custom-grey bg-transparent outline-none py-2 px-3 rounded w-full ${
                    (errors.sucursal && touched.sucursal) || error
                      ? "error"
                      : ""
                  }`}
                >
                  <option
                    value=""
                    label="Seleccione una sucursal"
                    className="bg-[#2b2b2b]"
                  />
                  {sucursales.map((sucursal, index) => (
                    <option
                      key={index}
                      value={sucursal}
                      label={sucursal}
                      className="bg-[#2b2b2b]"
                    />
                  ))}
                </Field>
                <span style={{ color: "red" }}>
                  <ErrorMessage name="sucursal" />
                </span>
              </div>
            )}

            {appointment.service.map((option, index) => (
              <div key={index}>
                <h4 className="text-custom-white text-lg font-semibold py-1">
                  Sus servicios actualmente:
                </h4>
                <p className="font-extralight pb-1 text-base">{option.type}</p>
                <p className="font-normal pb-2 text-base text-custom-grey">
                  {appointment.sucursal.name}
                </p>
                <Link href={`${PATHROUTES.SERVICES}/${option.id}`}>
                  <Image
                    alt={option.type}
                    src={option.image}
                    height={150}
                    width={150}
                  />
                </Link>
              </div>
            ))}
          </div>
          {error ? <p className="text-red-600">¡{error}!</p> : ""}
          <div className="flex h-10 mt-4 justify-center w-full">
            <button
              type="submit"
              className={`bg-custom-red rounded text-base py-2 sm:px-3 w-full font-semibold hover:bg-custom-white hover:text-custom-red ${
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

export default FormUpdateReservation;
