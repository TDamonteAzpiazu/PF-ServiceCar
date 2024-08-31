import React from "react";
import { Field, ErrorMessage, FormikProps } from "formik";

interface InputProps {
  nombre: string;
  title: string;
  type: string;
  formikProps: FormikProps<any>;
  error?: string | null;
  textarea?: boolean;
}
const ContainerInput: React.FC<InputProps> = ({
  nombre,
  title,
  type,
  formikProps,
  error,
  textarea = false,

}) => {
  return (
    <div className="w-full">
      <div className="cont-input">
        <Field
          as={textarea ? "textarea" : "input"}
          type={type}
          name={nombre}
          className={`${
            (formikProps.errors[nombre] && formikProps.touched[nombre]) || error
              ? "error"
              : ""
          } input `}
          placeholder=" "
        />
        <label
          htmlFor={nombre}
          className={`${
            (formikProps.errors[nombre] && formikProps.touched[nombre]) || error
              ? "errorLabel"
              : ""
          } label`}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            transition: ".4s",
          }}
        >
          {title}
        </label>
      </div>
      <span className="span" style={{ color: "red" }}>
        <ErrorMessage name={nombre} />
      </span>
    </div>
  );
};

export default ContainerInput;
