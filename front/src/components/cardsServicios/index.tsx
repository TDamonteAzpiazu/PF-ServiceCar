import { IService } from "@/helpers/types/types"
import ServiceCard from "../cardServicios"

const Cards: React.FC<{servicios: IService[]}> = ({ servicios }) => {
    return (
        <div>
            {servicios.map((servicio) => (
                <ServiceCard key={servicio.id} {...servicio}/>
            ))}
        </div>
    )
}