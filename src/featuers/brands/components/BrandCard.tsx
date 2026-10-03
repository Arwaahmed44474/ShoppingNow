import Link from 'next/link';
import { Brand } from '../types/brandsTypes';


export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group flex flex-col items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Brand Logo Container */}
      <div className="flex h-36 w-full items-center justify-center rounded-xl bg-gray-50/60 p-4 transition-colors group-hover:bg-gray-100/50">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-h-full max-w-full object-contain grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>

      {/* Brand Title */}
      <h3 className="mt-3 text-sm font-semibold text-gray-700 transition-colors group-hover:text-purple-600">
        {brand.name}
      </h3>
    </Link>
  );
}