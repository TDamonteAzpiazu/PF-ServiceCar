import { IService, ISucursales } from "@/helpers/types/types";

export const filtrarServiciosPorSucursal = (
  servicios: IService[],
  sucursalSeleccionada: string,
  palabraClave: string,
  vehiculosSeleccionados: string[]
): IService[] => {
  const palabraClaveNormalizada = palabraClave.toLowerCase();

  return servicios.filter(servicio => {
   
    const esSucursalSeleccionada = sucursalSeleccionada === "" || 
      servicio.sucursales.includes(sucursalSeleccionada);

    
    const esVehiculoSeleccionado = vehiculosSeleccionados.length === 0 ||
      vehiculosSeleccionados.includes(servicio.vehiculo);

   
    const coincideBusqueda = 
      servicio.type.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.description.toLowerCase().includes(palabraClaveNormalizada) ||
      servicio.vehiculo.toLowerCase().includes(palabraClaveNormalizada);

    return esSucursalSeleccionada && esVehiculoSeleccionado && coincideBusqueda;
  });
};
