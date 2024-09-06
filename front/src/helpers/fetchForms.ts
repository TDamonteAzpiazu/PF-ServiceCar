import Swal from "sweetalert2";
import { handleProp } from "./types/types";


export const handleSubmit = async ({
  setError,
  textError,
  textSwal,
  titleSwal,
  url,
  values,
}: handleProp) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: titleSwal,
        text: textSwal,
        icon: "success",
      });

      return { response, data };
    } else {
      setError(data.message || textError);
    }
  } catch (error) {
    setError(textError);
  }
};

