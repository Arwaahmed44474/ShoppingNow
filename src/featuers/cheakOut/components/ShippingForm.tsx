'use client'
import { 
  IconMapPin, 
  IconTruckDelivery, 
  IconCreditCard, 
  IconCash, 
  IconLock,
  IconPlus,
  IconCheck
} from "@tabler/icons-react";
import {  FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingaddresstype } from "../sheama/cheakoutSchema";


interface shoppingAddressFormPropes  {
  register: UseFormRegister<shippingaddresstype>,
  errors: FieldErrors<shippingaddresstype>,
  payMethode: 'cash' | 'online',
  setPayMethode: (method: 'cash' | 'online')=> void
}
export default function ShippingForm({ register, errors ,payMethode, setPayMethode}: shoppingAddressFormPropes) {
  
  // 

  return (
    <div className="space-y-6">
      {/* Shipping Address Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 flex items-center gap-3">
          <IconMapPin className="size-6" />
          <div>
            <h2 className="font-semibold text-lg leading-tight">Shipping Address</h2>
            <p className="text-xs text-emerald-100">Where should we deliver your order?</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Delivery Information Heading */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-primary-600 mb-4">
              <IconTruckDelivery className="size-5" />
              <div>
                <h3 className="font-semibold text-sm text-gray-800">Delivery Information</h3>
                <p className="text-xs text-gray-500">Please provide the exact address for smooth delivery</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('city')}
                  placeholder="e.g. Cairo, Alexandria, Sadat" 
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
                {errors.city && <p className="text-red-700 mt-1 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
                <textarea 
                  {...register('details')}
                  rows={3}
                  placeholder="Street name, building number, floor, apartment" 
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
                {errors.details && <p className="text-red-700 mt-1 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.details.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <input 
                    {...register('phone')}
                    type="tel" 
                    placeholder="e.g. 01012345678" 
                    className="w-full border border-gray-200 rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📞</span>
                </div>
                {errors.phone && <p className="text-red-700 mt-1 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.phone.message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 flex items-center gap-3">
          <IconCreditCard className="size-6" />
          <div>
            <h2 className="font-semibold text-lg leading-tight">Payment Method</h2>
            <p className="text-xs text-emerald-100">Choose how you'd like to pay</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          
          {/* Cash on Delivery */}
          <button
            onClick={() => {
              setPayMethode('cash')
            }}
            type="button"
            className={`w-full p-4 rounded-xl border-2 hover:border-primary-600 hover:bg-emerald-50/20 ${payMethode == 'cash' ? 'border-primary-600 bg-emerald-50/20' : 'border-gray-200'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${payMethode === 'cash' ? 'bg-emerald-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}>
                <IconCash className="size-6" />
              </div>

              <div>
                <h4 className="font-bold text-gray-800 text-sm text-start">Cash on Delivery</h4>
                <p className="text-xs text-gray-500">Pay when your order arrives at your doorstep</p>
              </div>
            </div>

            {payMethode == 'cash' ?
              <span className={`size-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs`}>
              <IconCheck className="size-3.5 stroke-3" />
            </span>:''}
          </button>

          {/* Pay Online */}
          <button
            onClick={() => {
              setPayMethode('online')
            }}
            type="button"
            className={`w-full p-4 rounded-xl border-2 hover:border-primary-600 hover:bg-emerald-50/20 ${payMethode == 'online' ? 'border-primary-600 bg-emerald-50/20' : 'border-gray-200'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${payMethode === 'online' ? 'bg-emerald-100 text-primary-600' : 'bg-gray-100 text-gray-600'}`}>
                <IconCreditCard className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm text-start">Pay Online</h4>
                <p className="text-xs text-gray-500">Secure payment with Credit/Debit Card via Paymob</p>
              </div>

            </div>
              {payMethode == 'online'? <span className={`size-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs`}>
              <IconCheck className="size-3.5 stroke-3" />
            </span>:''}
          </button>

          
          {/* Secure Badge */}
          <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2 text-gray-500 text-xs mt-2">
            <IconLock className="size-4 text-emerald-600" />
            <span><strong>Secure & Encrypted:</strong> Your payment information is processed securely.</span>
          </div>
        </div>
      </div>
    </div>
  );
}