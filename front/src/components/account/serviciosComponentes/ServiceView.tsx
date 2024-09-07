import { IService } from "@/helpers/types/types";
import ServiceCardView from "./ServiceCardView";

const ServiceView: React.FC<{ servicios: IService[] }> = ({ servicios }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
      {servicios.map((servicio: IService) => (
        <ServiceCardView key={servicio.id} {...servicio} />
      ))}
    </div>
  );
};

export default ServiceView;
