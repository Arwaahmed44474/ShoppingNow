import { getAllCat } from "@/featuers/catogries/services/getAllCatogries";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default async function CatogriesHome() {
    let AllCatogries = await getAllCat();
    
    return <>
        <section className="py-16">
            <div className="container ">
                <div className="flex flex-col justify-center ">
                    <h2 className="font-bold text-2xl lg:text-3xl before:w-1.5 before:h-full before:bg-primary-600 relative before:absolute before:rounded-md pl-5 before:left-0 before:top-0">Shop By <span className="text-primary-600">Category</span></h2>
                    <div className="text-primary-600 flex justify-end items-center gap-3 cursor-pointer">
                        <Link href={'/categories'} >View All Categories </Link>
                        <IconArrowRight />
                    </div>
                </div> 
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-3">
                    {
                        AllCatogries.data.map((catogray) => {
                            return <>
                                <Link key={catogray._id} href={`/categories/${catogray._id}`} className=" cursor-pointer shadow-md flex flex-col items-center rounded-xl py-4">
                                    <img className="size-24 object-cover rounded-full" src={catogray.image} alt={catogray.name} />
                                    <h3>{ catogray.name}</h3>
                                </Link>
                            </>
                        })
                    }
                </div>
            </div>
        </section>
    </>
}
