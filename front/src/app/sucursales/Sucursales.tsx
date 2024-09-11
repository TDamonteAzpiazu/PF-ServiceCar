import CardSucursales from "@/components/sucursales/CardSucursales";


const Sucursales:React.FC = () => {
  return (
    <main className=" text-white py-16 px-8">
      <h2 className="text-center text-3xl font-bold mb-12 mt-[65px]">Detalles de Nuestras Sucursales</h2>
     <CardSucursales />
    </main>
  );
};

export default Sucursales;
