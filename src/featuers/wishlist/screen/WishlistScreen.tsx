'use client'

import Link from 'next/link';
import { IconHeart, IconHeartBroken } from '@tabler/icons-react';
import { WishCard } from '../components/WishCard'; 
import { useSelector } from 'react-redux';
import { storeStateType } from '@/store/store';

export default function WishlistScreen() {
  const wishResponse = useSelector((state: storeStateType) => state.wishReducer);

  if ('statusMsg' in wishResponse || (wishResponse.status && wishResponse.status !== 'success')) {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <IconHeartBroken className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Failed to load wishlist</h2>
        <p className="mt-1 text-sm text-gray-500">
          {'message' in wishResponse ? (wishResponse as { message: string }).message : 'Something went wrong'}
        </p>
      </div>
    );
  }

  const wishlistItems = wishResponse.data || [];

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <IconHeart className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Wishlist is Empty</h2>
        <p className="mt-2 text-sm text-gray-500">
          Explore products and save your favorites to view them later.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-95"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <nav className="mb-3 text-xs text-gray-400">
            <Link className="transition-colors hover:text-emerald-600" href="/">
              Home
            </Link>{' '}
            / <span className="font-medium text-emerald-600">Wishlist</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <IconHeart className="h-6 w-6 fill-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                My Wishlist
              </h1>
              <p className="text-xs font-medium text-gray-400 sm:text-sm">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="hidden border-b border-gray-100 bg-gray-50/50 px-4 py-3 text-xs font-bold text-gray-400 sm:flex sm:items-center sm:justify-between">
            <span className="sm:w-2/5">Product</span>
            <span className="sm:w-1/5">Price</span>
            <span className="sm:w-1/5">Status</span>
            <span className="text-right sm:w-1/5">Actions</span>
          </div>

          <div className="divide-y divide-gray-100">
            {wishlistItems.map((item) => (
              <WishCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}