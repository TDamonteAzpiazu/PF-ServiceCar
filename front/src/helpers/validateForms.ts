import { FormikValues } from "formik";
import { FormValues } from "./types/types";

export const validarLogin = (input: FormikValues): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  return errors;
};
export const validarRegister = (input: FormikValues): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]).+$/;

  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.surname) {
    errors.surname = "El apellido es requerido";
  }
  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.address) {
    errors.address = "La dirección es requerida";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (!input.repeatPassword) {
    errors.repeatPassword = "Debe repetir la contraseña";
  }
  if (input.password !== input.repeatPassword) {
    errors.repeatPassword = "Las contraseña no coinciden";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  if (input.password && !passwordRegex.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caractér especial";
  }
  return errors;
};

export const validateForm = (formValues: FormValues) => {
  const errors: Partial<FormValues> = {};
  let isValid = true;
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!formValues.name) {
    errors.name = "Nombre es obligatorio";
    isValid = false;
  }
  if (!formValues.email) {
    errors.email = "Email es obligatorio";
    isValid = false;
  }
  if (formValues.email && !emailRegex.test(formValues.email)) {
    errors.email = "El email es inválido";
    isValid = false;
  }
  if (!formValues.asunto) {
    errors.asunto = "Asunto es obligatorio";
    isValid = false;
  }
  if (!formValues.message) {
    errors.message = "Mensaje es obligatorio";
    isValid = false;
  }

  return { isValid, errors };
};

export const validateAppointment = async (input: FormikValues) => {
  const selectedDate: Date = new Date(input.date);
  const selectedTime: Date = new Date(`2024-01-01 ${input.time}:00`);
  const errors: Partial<FormikValues> = {};
  if (!input.date) {
    errors.date = "La fecha es requerida";
  }
  if (!input.time) {
    errors.time = "La hora es requerida";
  }
  if (!input.sucursal || input.sucursal === "") {
    errors.sucursal = "La sucursal es requerida";
  }

  if (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) {
    errors.date = "Los turnos no están disponibles los sábados ni domingos.";
  }

  if (selectedDate < new Date()) {
    errors.date = "No puedes seleccionar una fecha anterior a hoy";
  }
  if (selectedTime.getHours() < 7 || selectedTime.getHours() > 17) {
    errors.time = "La hora debe estar entre las 07:00 y las 17:00";
  }

  const response = await fetch(
    "https://date.nager.at/api/v3/publicholidays/2024/AR",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const holidays = await response.json();

  const isHoliday = holidays.some((holiday: any) => {
    const holidayDate: Date = new Date(holiday.date);
    return (
      holidayDate.getDate() === selectedDate.getDate() &&
      holidayDate.getMonth() === selectedDate.getMonth()
    );
  });

  if (isHoliday) {
    errors.date = "No puedes seleccionar un feriado";
  }
  return errors;
};

export const getTomorrowDate = () => {
  const today: Date = new Date();
  const tomorrow: Date = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

export const validarUpdateUser = (
  input: FormikValues
): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.address) {
    errors.address = "La dirección es requerida";
  }

  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }

  return errors;
};

const generateTimeOptions = () => {
  const options: string[] = [];
  for (let hour = 7; hour < 17; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    options.push(`${hourStr}:00`, `${hourStr}:30`);
  }
  options.push("17:00");
  return options;
};
export const timeOptions = generateTimeOptions();

export const validateAppointmentUpdate = async (input: FormikValues) => {
  const selectedDate: Date = new Date(input.date);
  const selectedTime: Date = new Date(`2024-01-01 ${input.time}:00`);
  const errors: Partial<FormikValues> = {};
  if (!input.date) {
    errors.date = "La fecha es requerida";
  }
  if (!input.time) {
    errors.time = "La hora es requerida";
  }
  if (input.servicios && !input.sucursal) {
    errors.sucursal = "La sucursal es requerida";
  }

  if (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) {
    errors.date = "Los turnos no están disponibles los sábados ni domingos.";
  }

  if (selectedDate < new Date()) {
    errors.date = "No puedes seleccionar una fecha anterior a hoy";
  }
  if (selectedTime.getHours() < 7 || selectedTime.getHours() > 17) {
    errors.time = "La hora debe estar entre las 07:00 y las 17:00";
  }

  const response = await fetch(
    "https://date.nager.at/api/v3/publicholidays/2024/AR",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const holidays = await response.json();

  const isHoliday = holidays.some((holiday: any) => {
    const holidayDate: Date = new Date(holiday.date);
    return (
      holidayDate.getDate() === selectedDate.getDate() &&
      holidayDate.getMonth() === selectedDate.getMonth()
    );
  });

  if (isHoliday) {
    errors.date = "No puedes seleccionar un feriado";
  }
  return errors;
};

export const validateCreateSucursal = (selectedServicios: string[]) => {
  return async (input: FormikValues) => {
    const errors: Partial<FormikValues> = {};

    if (!input.name) {
      errors.name = "El nombre es requerido";
    }
    if (!input.address) {
      errors.address = "La dirección es requerida";
    }
    if (!input.latitud) {
      errors.latitud = "La latitud es requerida";
    }
    if (!input.longitud) {
      errors.longitud = "La longitud es requerida";
    }
    if (!input.details) {
      errors.details = "El detalle es requerido";
    }
    if (selectedServicios.length === 0) {
      errors.servicios = "Los servicios son requeridos";
    }

    return errors;
  };
};

export const validateUpdateSucursal = async (input: FormikValues) => {
  const errors: Partial<FormikValues> = {};

  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.address) {
    errors.address = "La dirección es requerida";
  }
  if (!input.latitud) {
    errors.latitud = "La latitud es requerida";
  }
  if (!input.longitud) {
    errors.longitud = "La longitud es requerida";
  }
  if (!input.details) {
    errors.details = "El detalle es requerido";
  }

  return errors;
};

export const validateCreateOpinion = async (input: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  if (!input.comment) {
    errors.comment = "El comentario es requerido";
  }
  if (!input.rating) {
    errors.rating = "La puntuación es requerida";
  }

  return errors;
};

export const validateFormService = (selectedSucursales: string[]) => {
  return async (input: FormikValues) => {
    const errors: Partial<FormikValues> = {};

    if (!input.type) {
      errors.type = "El tipo es requerido";
    }
    if (!input.price) {
      errors.price = "El precio es requerido";
    }
    if (!input.description) {
      errors.description = "La descripción es requerida";
    }
    if (!input.vehiculo) {
      errors.vehiculo = "El vehiculo es requerido";
    }
    if (selectedSucursales.length === 0) {
      errors.sucursales = "La sucursal es requerida";
    }

    return errors;
  };
};

export const validateFormServiceEdit = async (input: FormikValues) => {
  const errors: Partial<FormikValues> = {};

  if (!input.type) {
    errors.type = "El tipo es requerido";
  }
  if (!input.price) {
    errors.price = "El precio es requerido";
  }
  if (!input.description) {
    errors.description = "La descripción es requerida";
  }
  if (!input.sucursales) {
    errors.sucursales = "La sucursal es requerida";
  }
  if (!input.vehiculo) {
    errors.vehiculo = "El vehiculo es requerido";
  }

  return errors;
};
