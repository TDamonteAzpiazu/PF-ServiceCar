export const fetchGananciaSucursales = async (url: string, token: string) => {
  try {
    const response = await fetch(`${url}/admindash/gananciasSucursales`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewUsers = async (url: string, token: string) => {
  try {
    const response = await fetch(`${url}/admindash/newUsers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAppointmentsSucursal = async (url: string, token: string) => {
  try {
    const response = await fetch(`${url}/admindash/appointmentsBySucursal`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAppointmentsService = async (url: string, token: string) => {
  try {
    const response = await fetch(`${url}/admindash/appointmentsByService`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
