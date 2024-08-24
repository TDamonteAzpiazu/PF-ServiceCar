import Cards from "@/components/cardsServicios"
import { FetchServicio } from "@/helpers/serviciosFetch"

const Servicios = async () => {
    const servicios = await FetchServicio()
    return (
        <main>
            <h2>Servicios</h2>
            <section>
                <Cards servicios={servicios}/>
            </section>
        </main>
    )
}

export default Servicios