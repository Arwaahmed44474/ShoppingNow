'use client'
import { storeStateType } from "@/store/store";
import { IconShoppingCart, IconShieldCheck, IconTruck, IconRefresh } from "@tabler/icons-react";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  let CartRespose = useSelector((allStoreStates: storeStateType) => { return allStoreStates.cartReducer });
  let totalPrice = CartRespose.data.products.reduce((result, prod) => {
      return result + (prod.count * prod.price)
  }, 0);
  
  return (

    
  
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm sticky top-6">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 flex items-center gap-3">
        <IconShoppingCart className="size-6" />
        <h2 className="font-semibold text-lg leading-tight">Order Summary</h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Products List */}
        <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">

          {CartRespose.data.products.map((product) => {
            return <>
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400">
                    <img src={product.product.imageCover} alt="" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">{product.product.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{product.count} × {product.price} EGP</p>
                  </div>
                </div>
                <span className="font-bold text-xs text-gray-800 whitespace-nowrap">{product.count * product.price} EGP</span>
              </div>
            </>
          })}
          

        </div>

        
        <hr className="border-gray-100" />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">{totalPrice} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-bold text-emerald-600 uppercase text-xs bg-emerald-50 px-2 py-0.5 rounded">
            {totalPrice >= 500? 'FREE':  50}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
            <span>Total</span>
            <span className="text-primary-600 text-lg">{totalPrice >= 500? totalPrice: totalPrice+ 50} EGP</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
          <span>Place Order</span>
        </button>

        {/* Trust Badges */}
        <div className="pt-2 grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 border-t border-gray-100">
          <div className="flex flex-col items-center gap-1">
            <IconShieldCheck className="size-4 text-primary-600" />
            <span>Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconTruck className="size-4 text-primary-600" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <IconRefresh className="size-4 text-primary-600" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}