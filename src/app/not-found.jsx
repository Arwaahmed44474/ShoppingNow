
import Link from 'next/link';
import {
  IconHome,
  IconArrowLeft,
  IconShoppingCart,
} from '@tabler/icons-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-emerald-50/20 px-4 py-12 text-center overflow-hidden">
      {/* Central Illustration / Card */}
      <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-3xl bg-white shadow-xl shadow-emerald-500/5 border border-emerald-50">
        {/* Shopping Cart Icon */}
        <IconShoppingCart size={64} className="text-emerald-500" stroke={1.5} />

        {/* 404 Badge */}
        <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white shadow-md shadow-emerald-500/20 border-2 border-white">
          404
        </div>
      </div>

      {/* Smiley Decorator */}
      <div className="mb-3 flex items-center justify-center gap-1.5 text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        <span className="text-xs font-bold font-mono">◡</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
      </div>

      {/* Main Heading & Subtitle */}
      <h1 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-tight">
        Oops! Nothing Here
      </h1>
      <p className="mt-2 max-w-md text-sm font-medium text-gray-500 leading-relaxed">
        Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
      </p>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98]"
        >
          <IconHome size={18} />
          <span>Go to Homepage</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]"
        >
          <IconArrowLeft size={18} />
          <span>Go Back</span>
        </button>
      </div>

      {/* Popular Destinations Box */}
      <div className="mt-12 w-full max-w-md rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
        <span className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase">
          Popular Destinations
        </span>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/products"
            className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            All Products
          </Link>
          <Link
            href="/categories"
            className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Categories
          </Link>
          <Link
            href="/deals"
            className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Today's Deals
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}