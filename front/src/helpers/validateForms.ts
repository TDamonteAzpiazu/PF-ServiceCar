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
  const phoneRegex: RegExp =
    /^\+?\d{1,3}[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;

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

<<<<<<< HEAD
export const validateForm = (formValues: FormValues)  => {
=======
export const validateForm = (formValues: FormValues) => {
>>>>>>> dev
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
<<<<<<< HEAD
  } 
=======
  }
>>>>>>> dev
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
