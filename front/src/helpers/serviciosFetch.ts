import { IService } from "./types/types";

const apiURL = process.env.NEXT_PUBLIC_URL

export const FetchServicio = async () => {
    try {
        const res = await fetch(`${apiURL}/services`, {
            method: "GET",
            next: {revalidate: 3600} //opcion de revalidacion 
        
        });
        const servicios: IService[] = await res.json();
        return servicios;

    } catch (error: any) {
        throw new Error(error)
    }
  };