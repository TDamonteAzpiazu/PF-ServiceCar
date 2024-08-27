import HomeAbout from "./HomeAbout"
import GarageHome from "./GarageHome"
import HomeOpiniones from "./HomeOpiniones"
import ServiciosLanding from "./ServicioLanding"


const HomeContainer = () => {
    return <div>
        <GarageHome/>
        <ServiciosLanding/>
        <HomeAbout/>
        <HomeOpiniones/>
    </div>
}

export default HomeContainer