import { FetchServicio } from "@/helpers/serviciosFetch"

const Servicios = async () => {
    const servicios = await FetchServicio()
    return (
        <main>

        </main>
    )
}

export default Servicios