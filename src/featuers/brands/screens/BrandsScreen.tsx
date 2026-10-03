import Link from 'next/link';
import { IconTag } from '@tabler/icons-react';
import { BrandCard } from '../components/BrandCard';
import { getBrands } from '../services/brandsActions';


export default async function BrandsScreen() {

    let brandResponse = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50/30 pb-16">
      {/* Top Banner Header */}
      <div className="w-full bg-linear-to-r from-purple-600 via-purple-500 to-indigo-500 py-12 text-white shadow-md">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-4 text-xs text-purple-200">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{' '}
            / <span className="text-white font-medium">Brands</span>
          </nav>

          {/* Title & Icon */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <IconTag className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Top Brands
              </h1>
              <p className="mt-1 text-sm font-medium text-purple-100">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid Section */}
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brandResponse.data.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}