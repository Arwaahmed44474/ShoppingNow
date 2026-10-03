import CatogriesHome from '@/home/components/CatogriesHome'
import { IconLayersIntersect } from '@tabler/icons-react'
import Link from 'next/link'
import { getAllCat } from '../services/getAllCatogries';
import { getProducties } from '@/featuers/productes/services/getProductes';


export default async function CatsScreen() {
    let AllCatogries = await getAllCat();

    console.log(AllCatogries)    

    return <>
        <div>
            
            <div className="w-full bg-emerald-500 py-10 text-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-4 text-xs font-medium text-emerald-100">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>{' '}
                    / <span className="text-white font-semibold">Categories</span>
                    </nav>

                    {/* Categories Info Section */}
                    <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner backdrop-blur-md">
                        <IconLayersIntersect size={32} stroke={1.8} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        All Categories
                        </h1>
                        <p className="mt-1 text-sm font-medium text-emerald-50">
                        Browse our wide range of product categories
                        </p>
                    </div>
                    </div>


                    
                </div>
                

            </div>
            

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-3 py-20">
                    {
                        AllCatogries.data.map((catogray) => {
                            return <>
                                <Link href={`/categories/${catogray._id}`} className=" cursor-pointer shadow-md flex flex-col items-center rounded-xl py-4">
                                    <img className="size-24 object-cover rounded-full" src={catogray.image} alt={catogray.name} />
                                    <h3>{ catogray.name}</h3>
                                </Link>
                            </>
                        })
                    }
            </div>
            
        </div>
    
    </>
}
