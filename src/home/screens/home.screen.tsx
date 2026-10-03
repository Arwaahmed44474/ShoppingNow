import CatogriesHome from "../components/CatogriesHome";
import SliderHome from "../components/SliderHome";
import ProductesHome from "../components/ProductesHome";



export default function HomeScreen() {

    return <>
        {/* Slider */}
        <SliderHome/>
        
        {/* Catogries  */}
        <CatogriesHome />

        {/* features productes */}
        <ProductesHome/>
        
    </>
}
