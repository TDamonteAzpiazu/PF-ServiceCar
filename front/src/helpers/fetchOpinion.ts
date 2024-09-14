import Swal from "sweetalert2";
export const createOpinion = async (
  url: string,
  token: string,
  values: any
) => {
  try {
    
    console.log(values);

    const response = await fetch(`${url}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Opinion creada exitosamente",
        text: `Ya puede visualizarla en su dashboard.`,
        icon: "success",
      });
    }
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
