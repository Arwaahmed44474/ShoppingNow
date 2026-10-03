import Link from 'next/link';
import { IconArrowLeft, IconFolderOff } from '@tabler/icons-react';
import { getProducties } from '@/featuers/productes/services/getProductes';
import { getSpicificCat } from '../services/getAllCatogries';
import ProductCard from '@/featuers/productes/components/ProductCard';

export default async function CatProductesScreen({catID}: {catID:string}) {
  const categoryName = "Women's Fashion";
  const categoryImage = "https://ecommerce.routemisr.com/Route-Academy-categories/1678603727043.png"; 

    let allProductes = await getProducties();
    let spicificCat = await getSpicificCat(catID);
    
      function filterByBrand() {
        if (!allProductes?.data || !catID) return [];
    
        return allProductes.data.filter((product) => {
          return product.category?._id === catID;
        });
    
      }
      let filterCatArr = filterByBrand();

    console.log(filterCatArr);
    

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Top Banner Header */}
      <div className="w-full bg-emerald-500 py-10 text-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-xs font-medium text-emerald-100">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{' '}
            /{' '}
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>{' '}
            / <span className="text-white font-semibold">{spicificCat.data.name}</span>
          </nav>

          {/* Category Info Section */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-md">
              <img
                src={spicificCat.data.image}
                alt={spicificCat.data.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {spicificCat.data.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-emerald-50">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 sm:px-6">
        {/* Back to Categories Link */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-emerald-600"
        >
          <IconArrowLeft size={18} />
          <span>Back to Categories</span>
        </Link>

              {/* Empty State View */}
              {
                 filterCatArr.length == 0?  <div className="my-16 flex flex-col items-center justify-center text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <IconFolderOff size={36} stroke={1.5} />
                            </div>

                            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                No Products Found
                            </h2>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                                This category doesn't have any products yet.
                            </p>

                            <Link
                                href="/products"
                                className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]"
                            >
                                View All Products
                            </Link>
                                </div>:''
                    }
        
              {filterCatArr.length > 0 ?
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5">
                            {
                                filterCatArr.map((product) => {
                                    return <> <ProductCard key={product._id} product={product } /> </>
                                } )
                            }
                          </div>:''}
              


      </div>
    </div>
  );
}