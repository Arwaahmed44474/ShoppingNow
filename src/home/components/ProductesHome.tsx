import Loading from "@/components/loading/Loading";
import ProductCard from "@/featuers/productes/components/ProductCard";
import { getProducties } from "@/featuers/productes/services/getProductes"
import { IconArrowRight } from "@tabler/icons-react";
export default async function ProductesHome() {


    let allProductes = await getProducties();

    
    return <>
        <section className="py-16">
            <div className="container ">
                <div className="flex flex-col justify-center ">
                    <h2 className="font-bold text-2xl lg:text-3xl before:w-1.5 before:h-full before:bg-primary-600 relative before:absolute before:rounded-md pl-5 before:left-0 before:top-0">Featured <span className="text-primary-600">Productes</span></h2>
                    <div className="text-primary-600 flex justify-end items-center gap-3 cursor-pointer">
                        <p >View All Categories </p>
                        <IconArrowRight />
                    </div>
                </div> 

                {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5">
                    {
                        allProductes.data.map((product) => {
                            return <> <ProductCard key={product._id} product={product } /> </>
                        } )
                    }
                </div> */}

                <div className="container mx-auto px-4 sm:px-6">
                                <p className="text-gray-700">showing {allProductes.data.length} product</p>
                                {!allProductes ? <Loading /> :
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5">
                                                    {
                                                        allProductes.data.map((product) => {
                                                            return <> <ProductCard key={product._id} product={product } /> </>
                                                        } )
                                                    }
                                                </div>
                                }
                                
                </div>
                
            </div>
        </section>
    </>
}
