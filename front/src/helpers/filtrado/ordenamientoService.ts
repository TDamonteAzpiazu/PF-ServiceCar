import { IService } from "@/helpers/types/types";

export const ordenarPrecioAsc = (services: IService[]) => {
  return [...services].sort((a, b) => a.price - b.price);
};

export const ordernarPrecioDesc = (services: IService[]) => {
  return [...services].sort((a, b) => b.price - a.price);
};
