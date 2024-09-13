import { UpdateServiceStatus } from "@/helpers/serviciosFetch";
import { useState } from "react";
import Swal from "sweetalert2";

const StatusButton: React.FC<{
  id: string;
  status: string;
  onStatusChange: () => void;
}> = ({ id, status, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const isInactive = status === "inactive";

  const handleStatusChange = async () => {
    const action = isInactive ? "habilitar" : "deshabilitar";
    const newStatus = isInactive ? "active" : "inactive";
    Swal.fire({
      title: `¿Estás seguro de ${action} este servicio?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await UpdateServiceStatus(id, newStatus);
          Swal.fire(
            "¡Éxito!",
            `El servicio ha sido ${action} correctamente.`,
            "success"
          );
          onStatusChange();
        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al actualizar el estado del servicio.",
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <button
      onClick={handleStatusChange}
      className={`border rounded-lg py-1 px-2 text-base font-medium  hover:text-custom-white transition duration-300 ${
        isInactive
          ? "border-green-600 text-green-600 hover:bg-green-600"
          : "border-red-600 text-red-600 hover:bg-red-600"
      }`}
      disabled={loading}
    >
      {loading ? "Procesando..." : isInactive ? "Habilitar" : "Desabilitar"}
    </button>
  );
};

export default StatusButton;
