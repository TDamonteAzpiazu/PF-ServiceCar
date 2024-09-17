import GraficoTurnosServicios from "../../components/pruebagrafico/GraficoTurnosServicios"
import GraficoUsuarios from "../../components/pruebagrafico/GraficoUsuarios"
import { valoresGrafico, valoresGraficoTurnoServicio, valoresGraficoTurnos, valoresGraficoUsuarios } from "../../helpers/pruebaGrafico"

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
                <GraficoTurnosServicios data={valoresGrafico}/>
            </div>
            <h1 className="text-white font-bold">Grafico Usuarios Nuevos</h1>
            <div>
                <GraficoUsuarios data={valoresGraficoUsuarios}/>
            </div>
            <h1 className="text-white font-bold">Grafico turnos por sucursal</h1>
            <div>
                <GraficoTurnosServicios data={valoresGraficoTurnos}/>
            </div>
            <h1 className="text-white font-bold">Grafico Turnos por Servicio</h1>
            <div>
                <GraficoTurnosServicios data={valoresGraficoTurnoServicio}/>
            </div>
        </div>
    )
}

export default Pruebagrafico