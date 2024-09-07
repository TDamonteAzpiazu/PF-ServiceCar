import { UpdateServiceStatus } from "@/helpers/serviciosFetch";
import { useState } from "react";
import Swal from "sweetalert2";

const InhabilitarButton: React.FC<{ id: string; status: string; onStatusChange: () => void }> = ({ id, status, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const isInactive = status === "inactive";

  const handleStatusChange = async () => {
    const action = isInactive ? "habilitar" : "inhabilitar";
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
          const newStatus = isInactive ? "active" : "inactive";
          await UpdateServiceStatus(id, newStatus);
          Swal.fire("¡Éxito!", `El servicio ha sido ${action} correctamente.`, "success");
          onStatusChange();  // Refrescar estado del servicio
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al actualizar el estado del servicio.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <button
      onClick={handleStatusChange}
      className={`py-2 px-4 rounded transition duration-300 ${isInactive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
      disabled={loading}
    >
      {loading ? "Procesando..." : isInactive ? "Habilitar" : "Inhabilitar"}
    </button>
  );
};

export default InhabilitarButton;
