import CardSucursales from "@/components/sucursales/CardSucursales";
import { FetchSucursales } from "@/helpers/serviciosFetch";
import { ISucursales } from "@/helpers/types/types";


const Sucursales:React.FC = async() => {
  const sucursales:ISucursales[] = await FetchSucursales()
  return (
    <main className=" text-white py-16 px-8">
      <h2 className="text-center text-3xl font-bold mb-12 mt-[65px]">Detalles de Nuestras Sucursales</h2>
     <CardSucursales sucursales={sucursales}/>
    </main>
  );
};

export default Sucursales;
