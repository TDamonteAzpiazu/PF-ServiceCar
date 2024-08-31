import React, { useState } from "react";
import { Field, ErrorMessage, FormikProps } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = (type === "password" && isPasswordVisible) ? "text" : type;

 
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <div className="w-full">
      <div className="cont-input">
        <Field
          as={textarea ? "textarea" : "input"}
          type={inputType}
          name={nombre}
          className={`${
            (formikProps.errors[nombre] && formikProps.touched[nombre]) || error
              ? "error"
              : ""
          } input`}
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
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute sm:text-base text-sm sm:top-5 top-[13px] right-4"
          >
            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      <span className="span" style={{ color: "red" }}>
        <ErrorMessage name={nombre} />
      </span>
    </div>
  );
};

export default ContainerInput;
