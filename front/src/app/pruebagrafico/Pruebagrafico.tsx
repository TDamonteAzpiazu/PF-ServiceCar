import GraficoTurnos from "../../components/pruebagrafico/GraficoTurnos"
import GraficoTurnosServicios from "../../components/pruebagrafico/GraficoTurnosServicios"
import GraficoUsuarios from "../../components/pruebagrafico/GraficoUsuarios"
import PruebaGrafico from "../../components/pruebagrafico/PruebaGrafico"


const Pruebagrafico = () => {

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className="text-white font-bold">Grafico Ganancias por Sucursal</h1>
            <div>
                <PruebaGrafico />
            </div>
            <h1 className="text-white font-bold">Grafico Usuarios Nuevos</h1>
            <div>
                <GraficoUsuarios />
            </div>
            <h1 className="text-white font-bold">Grafico turnos por sucursal</h1>
            <div>
                <GraficoTurnos />
            </div>
            <h1 className="text-white font-bold">Grafico Turnos por Servicio</h1>
            <div>
                <GraficoTurnosServicios />
            </div>
        </div>
    )
}

export default Pruebagrafico