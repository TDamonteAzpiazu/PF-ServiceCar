import { FormikValues } from "formik";

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
  const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
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
  if (!input.phone) {
    errors.phone = "El teléfono es requerido";
  }
  if (!input.address) {
    errors.address = "La dirección es requerida";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  if (input.password && !passwordRegex.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número";
  }
  if (input.phone && !phoneRegex.test(input.phone)) {
    errors.phone = "El número ingresado es inválido";
  }

  return errors;
};
