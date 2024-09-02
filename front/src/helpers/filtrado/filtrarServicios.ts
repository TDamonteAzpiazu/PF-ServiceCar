import { IService, ISucursales } from "@/helpers/types/types";

export const filtrarServicios = (
  servicios: IService[],
  palabraClave: string,
  ubicacionesSeleccionadas: ISucursales[], // Cambiado a ISucursales[]
  vehiculosSeleccionados: string[]
): IService[] => {
  const palabraClaveNormalizada = palabraClave.toLowerCase();

  return servicios.filter(servicio => {
    const tieneSucursalSeleccionada = ubicacionesSeleccionadas.length === 0 ||
      servicio.sucursales.some(sucursal =>
        ubicacionesSeleccionadas.some(ubicacion => ubicacion.name === sucursal.name)
      );

    const esVehiculoSeleccionado = vehiculosSeleccionados.length === 0 ||
      vehiculosSeleccionados.includes(servicio.vehiculo);

    const coincideBusqueda = 
      servicio.type.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.description.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.vehiculo.toLowerCase().includes(palabraClaveNormalizada);

    return tieneSucursalSeleccionada && esVehiculoSeleccionado && coincideBusqueda;
  });
};
