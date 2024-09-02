import { IService } from "@/helpers/types/types";

export const filtrarServicios = (servicios: IService[], palabraClave: string): IService[] => {
  const palabraClaveNormalizada = palabraClave.toLowerCase();
  return servicios.filter(servicio =>
    servicio.type.toLowerCase().includes(palabraClaveNormalizada) ||
    servicio.description.toLowerCase().includes(palabraClaveNormalizada) ||
    servicio.location.toLowerCase().includes(palabraClaveNormalizada)
  );
};