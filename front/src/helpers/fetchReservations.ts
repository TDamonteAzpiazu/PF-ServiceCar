import Swal from "sweetalert2";
import { IAppointment, IAppointmentUser } from "./types/types";
export const getAppointments = async (url: string, token: string) => {
  try {
    const response = await fetch(url, {
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

export const deleteAppointment = async (url: string, token: string) => {
  try {
    const result = await Swal.fire({
      title: "¿Está seguro/a de eliminar la reserva?",
      text: "Perderá el turno agendado para el servicio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar.",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          title: "Eliminado",
          text: "La reserva ha sido eliminada.",
          icon: "success",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: errorData.message || "No se pudo eliminar la reserva.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Operación cancelada",
        text: "¡La reserva no se ha eliminado!.",
        icon: "info",
      });
    }
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar la reserva.",
      icon: "error",
    });
  }
};

export const updateAppointment = async (
  url: string,
  token: string,
  data: any,
  appointment: IAppointmentUser,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const idService = appointment.service.map((item) => {
      return item.id;
    });
    const valueForm: IAppointment = {
      date: data.date ? data.date : appointment.date,
      service: data.servicios ? [data.servicios] : idService,
      time: data.time ? data.time : appointment.time,
      user: appointment.user.id,
      // sucursal: data.sucursales ? data.sucursales : appointment.sucursal,
    };
    const resReservations = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(valueForm),
    });
    const appointmentRes = await resReservations.json();
    if (resReservations.ok) {
      Swal.fire({
        title: "Reserva actualizada",
        text: "La reserva ha sido editada correctamente.",
        icon: "success",
      });
    }
    return appointmentRes;
  } catch (error: any) {
    console.log(error);
    setError(error.message);
  }
};
