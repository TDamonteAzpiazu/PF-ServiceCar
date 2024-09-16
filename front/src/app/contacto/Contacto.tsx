import ContactoForm from "@/components/contacto/ContactoForm";
import ContactoImg from "@/components/contacto/ContactoImg";
import ContactoInfo from "@/components/contacto/ContactoInfo";

const Contacto: React.FC = () => {
  return (
    <div className="flex flex-col mx-10">
      {/* Encabezado centrado */}
      <h1 className="text-white text-4xl font-bold text-center mb-10 mt-[115px]">
        CONTACTANOS
      </h1>

      {/* Sección superior con ContactoForm y ContactoInfo */}
      <div className="flex flex-col md:flex-row w-full justify-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:max-w-[550px] flex-grow flex items-stretch">
          <ContactoForm />
        </div>
        <div className="w-full md:max-w-[550px] flex-grow flex items-stretch">
          <ContactoInfo />
        </div>
      </div>

      {/* Sección inferior con ContactoImg */}
      <div className="w-full my-8">
        <ContactoImg />
      </div>
    </div>
  );
};

export default Contacto;
