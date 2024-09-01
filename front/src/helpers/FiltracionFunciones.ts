// import { IService } from "./types/types";

// export const filtrarServicios = (
//     servicios: IService[],
//     palabraClave: string
//   ): IService[] => {
//     return servicios.filter(
//       (servicio) =>
//         servicio.type.toLowerCase().includes(palabraClave.toLowerCase()) ||
//         servicio.description.toLowerCase().includes(palabraClave.toLowerCase())
//     );
//   };
  
//   export const filtrarServiciosPorFiltros = (
//     servicios: IService[],
//     ubicaciones: string[],
//     tipos: string[]
//   ): IService[] => {
//     return servicios.filter((servicio) => {
//       const matchUbicacion =
//         ubicaciones.length === 0 || ubicaciones.includes(servicio.location);
//       const matchTipo =
//         tipos.length === 0 || tipos.includes(servicio.tipo);
//       return matchUbicacion && matchTipo;
//     });
//   };
  