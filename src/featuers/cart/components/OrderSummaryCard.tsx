'use client'
import { IconUser } from '@tabler/icons-react';
import { cartInitType } from '../slice/cartSlice';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { storeStateType } from '@/store/store';


export default function OrderSummaryCard({summeryInf}:{summeryInf:cartInitType}) {
  const {data,numOfCartItems} = summeryInf 
  
  let {isAuthenticated} =  useSelector((state:storeStateType) => {
    return state.authReducer
  })
  
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Dark Header */}
      <div className="bg-[#0f172a] px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          Order Summary
        </h2>
      </div>

      {/* Content Body */}
      <div className="p-6">
        {/* Subtotal & Shipping */}
        <div className="space-y-4 text-slate-600">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal ( {numOfCartItems} {numOfCartItems>1?'items':'item'})</span>
            <span className="font-semibold text-slate-900">{data.totalCartPrice} EGP</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>Shipping</span>
            <span className="font-medium text-emerald-600">Calculated at checkout</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-100" />

        {/* Estimated Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">Estimated Total</span>
          <span className="text-xl font-extrabold text-emerald-600">{data.totalCartPrice} EGP</span>
        </div>

        {/* Action Button */}
        {!isAuthenticated ?
          <>
          <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 px-4 font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
        >
          <IconUser size={20} />
          <Link href={'/login'}>Login to Checkout</Link>
          </button>
          {/* Sign up link */}
        <div className="mt-3 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link href={'/signup'} className="font-semibold text-emerald-600 hover:underline">
            Sign up
          </Link>
        </div>
          </>
        
          : <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 px-4 font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
        >
          <IconUser size={20} />
          <Link href={'/cheakout'}>Checkout</Link>
        </button>}

        

        {/* Divider */}
        <div className="my-5 border-t border-gray-100" />

        {/* Feature List */}
        <ul className="space-y-2 text-xs text-slate-500">
          <li className="flex items-center gap-1.5">
            <span className="text-slate-400">✓</span>
            <span>Your cart items will be saved</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-slate-400">✓</span>
            <span>Track your orders easily</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-slate-400">✓</span>
            <span>Access exclusive member deals</span>
          </li>
        </ul>
      </div>
    </div>
  );
}