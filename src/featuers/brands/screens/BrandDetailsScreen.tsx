import Link from 'next/link';
import { IconFilter, IconFolderOff, IconTag, IconX } from '@tabler/icons-react';
import { getspecificBrands } from '../services/brandsActions';
import { getProducties } from '@/featuers/productes/services/getProductes';
import ProductCard from '@/featuers/productes/components/ProductCard';

export default async function BrandDetailsScreen({ brandID }: { brandID: string }) {

  let spicifcBrand = await getspecificBrands(brandID);
  
  let allProductes = await getProducties();


  function filterByBrand() {
    if (!allProductes?.data || !spicifcBrand?.data?._id) return [];

    return allProductes.data.filter((product) => {
      return product.brand?._id === brandID;
    });

  }
  let filterBrandArr = filterByBrand();
    console.log(filterBrandArr[0]);
  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Top Banner Header */}
      <div className="w-full bg-emerald-500 py-10 text-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-4 text-xs font-medium text-emerald-100">
            <Link href={'/'} className="hover:text-white transition-colors">
              Home
            </Link>{' '}
            / '
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>{' '}
            / <span className="text-white font-semibold">{spicifcBrand.data.name}</span>
          </nav>

          {/* Brand Info Section */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-md">
              <img
                src={spicifcBrand.data.image}
                alt={spicifcBrand.data.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {spicifcBrand.data.name}
              </h1>
              <p className="mt-1 text-sm font-medium text-emerald-50">
                Shop {spicifcBrand.data.name} products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Counter Bar */}
      <div className="container mx-auto px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {/* Active Filters Label */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <IconFilter size={16} className="text-gray-600" />
              <span>Active Filters:</span>
            </div>

            {/* Filter Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 border border-purple-100">
              <IconTag size={14} className="text-purple-600" />
              <span>{spicifcBrand.data.name}</span>
              <button
                type="button"
                className="ml-0.5 rounded-full p-0.5 hover:bg-purple-100 text-purple-600 transition-colors"
                aria-label="Remove filter"
              >
                <IconX size={12} />
              </button>
            </div>

            {/* Clear All Link */}
            <button
              type="button"
              className="text-xs font-medium text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Showing Products Counter */}
        <p className="mt-6 text-xs font-semibold text-gray-500">
          Showing {filterBrandArr.length} products
        </p>

        {filterBrandArr.length > 0 ?
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5">
                {
                    filterBrandArr.map((product) => {
                        return <> <ProductCard key={product._id} product={product } /> </>
                    } )
                }
        </div>:''}
        
        

        {
          filterBrandArr.length == 0 ?
                  <div className="my-16 flex flex-col items-center justify-center text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <IconFolderOff size={36} stroke={1.5} />
                            </div>

                            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                No Products Found
                            </h2>
                            <p className="mt-1 text-sm font-medium text-gray-500">
                                This brand doesn't have any products yet.
                            </p>

                            <Link
                                href="/products"
                                className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-[0.98]"
                            >
                                View All Products
                            </Link>
                                </div>: ''
          }
      </div>
    </div>
  );
}