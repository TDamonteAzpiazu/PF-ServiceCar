import { IService, ISucursales } from "@/helpers/types/types";

export const filtrarServiciosPorSucursal = (
  servicios: IService[],
  sucursalesSeleccionadas: string[], 
  palabraClave: string,
  vehiculosSeleccionados: string[]
): IService[] => {
  const palabraClaveNormalizada = palabraClave.toLowerCase();

  return servicios.filter((servicio) => {
    const tieneTodasLasSucursales = sucursalesSeleccionadas.length === 0 || 
      sucursalesSeleccionadas.every((sucursal) =>
        servicio.sucursales.includes(sucursal)
      );

    const esVehiculoSeleccionado =
      vehiculosSeleccionados.length === 0 ||
      vehiculosSeleccionados.includes(servicio.vehiculo);

    const coincideBusqueda =
      servicio.type.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.description.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.vehiculo.toLowerCase().includes(palabraClaveNormalizada);

    return tieneTodasLasSucursales && esVehiculoSeleccionado && coincideBusqueda;
  });
};

