import { IconLayersIntersect } from "@tabler/icons-react";
import Link from "next/link";
import { getProducties } from "../services/getProductes";
import Loading from "@/components/loading/Loading";
import ProductesHome from "@/home/components/ProductesHome";
import ProductCard from "../components/ProductCard";

export default async function AllProductsPageScreen() {
    let allProductes = await getProducties();
    return <>
        <div>
             <div className="w-full bg-emerald-500 py-10 text-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-4 text-xs font-medium text-emerald-100">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>{' '}
                    / <span className="text-white font-semibold">All Product</span>
                    </nav>

                    {/* Categories Info Section */}
                    <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner backdrop-blur-md">
                        <IconLayersIntersect size={32} stroke={1.8} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        All Products
                        </h1>
                        <p className="mt-1 text-sm font-medium text-emerald-50">
                        Explore Our complete Products collection
                        </p>
                    </div>
                    </div>

                </div>
        </div>   

            <div className="container mx-auto px-4 sm:px-6">
                <p className="text-gray-700">showing {allProductes.data.length} product</p>
                {!allProductes ? <Loading /> :
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 py-16">
                                    {
                                        allProductes.data.map((product) => {
                                            return <> <ProductCard key={product._id} product={product } /> </>
                                        } )
                                    }
                                </div>
                }
                
            </div>
            
        </div>
        
        

        

    </>
}
