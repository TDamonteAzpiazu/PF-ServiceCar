import { IService, ISucursales } from "@/helpers/types/types";

// Función para filtrar los servicios por sucursal, palabra clave y vehículos seleccionados
export const filtrarServiciosPorSucursal = (
  servicios: IService[],
  sucursalSeleccionada: string,
  palabraClave: string,
  vehiculosSeleccionados: string[]
): IService[] => {
  const palabraClaveNormalizada = palabraClave.toLowerCase();

  return servicios.filter(servicio => {
    // Verificar si la sucursal seleccionada está entre las sucursales del servicio
    const esSucursalSeleccionada = sucursalSeleccionada === "" || 
      servicio.sucursales.includes(sucursalSeleccionada);

    // Verificar si el vehículo está seleccionado
    const esVehiculoSeleccionado = vehiculosSeleccionados.length === 0 ||
      vehiculosSeleccionados.includes(servicio.vehiculo);

    // Verificar si el servicio coincide con la búsqueda
    const coincideBusqueda = 
      servicio.type.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.description.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.vehiculo.toLowerCase().includes(palabraClaveNormalizada);

    // Retornar si cumple con todas las condiciones
    return esSucursalSeleccionada && esVehiculoSeleccionado && coincideBusqueda;
  });
};
