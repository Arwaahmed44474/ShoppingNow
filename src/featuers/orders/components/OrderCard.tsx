'use client';

import React, { useState } from 'react';
import {
  IconClock,
  IconCalendar,
  IconShoppingBag,
  IconMapPin,
  IconChevronUp,
  IconChevronDown,
  IconReceipt,
  IconPhone,
  IconCamera,
  IconTruckFilled,
  IconBrandMastercard,
  IconCash,
} from '@tabler/icons-react';
import { OrderInterface } from '../type/ordersType';

export function OrderCard({ order }: { order: OrderInterface }) {
    
    const [isOpen, setIsOpen] = useState(false);

    let {cartItems ,createdAt, id,isDelivered,isPaid,paymentMethodType,shippingAddress,shippingPrice,taxPrice,totalOrderPrice,user} = order;

  return (
    <div className="w-full rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          {/* Main Thumbnail */}
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
            <img
              src={cartItems[0].product.imageCover}
              alt="Woman Shawl"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          {/* Header Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full ${isPaid?'bg-blue-100 text-blue-800':'bg-amber-100 text-amber-700'} px-2.5 py-0.5 text-xs font-semibold`}>
                {isPaid? <IconTruckFilled className="h-3 w-3"/>:<IconClock className="h-3 w-3" />}
                              {isPaid ? 'On the way' : 'Processing'}
                              
              </span>
            </div>

                      <h3 className="text-lg font-bold text-gray-900"># { id}</h3>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400">
              <span className="flex items-center gap-1">
                <IconCalendar className="h-3.5 w-3.5" />
                {new Date(createdAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <IconShoppingBag className="h-3.5 w-3.5" />
                {cartItems.length} {cartItems.length>1?'items':'item'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <IconMapPin className="h-3.5 w-3.5" />
                {shippingAddress?.city}
              </span>
            </div>

            <div className="pt-1">
                          <span className="text-xl font-black text-gray-900">{ totalOrderPrice}</span>
              <span className="ml-1 text-xs font-bold text-gray-400">EGP</span>
            </div>
          </div>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
          <button
            type="button"
            className={`rounded-xl border border-gray-100 ${paymentMethodType=='cash'?'bg-gray-50 p-2 text-gray-600':'bg-fuchsia-50 p-2 text-fuchsia-600'} transition-colors hover:bg-gray-100`}
          >
            {paymentMethodType == 'cash'? <IconCash/>:<IconBrandMastercard/>}
          </button>

          {/* زر التحكم بالـ State */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            <span>{isOpen ? 'Hide' : 'Details'}</span>
            {isOpen ? (
              <IconChevronUp className="h-4 w-4" />
            ) : (
              <IconChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Details Section - يتم إظهاره وإخفاؤه بناءً على isOpen */}
      {isOpen && (
        <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
          {/* Section Heading: Order Items */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
            <span className="rounded bg-emerald-100 p-1 text-emerald-700">
              <IconReceipt className="h-3.5 w-3.5" />
            </span>
            <span>Order Items</span>
          </div>
          {/* Item Card */}
            <div>
                      {cartItems.map((item) => {
                          return <>
                          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/40 p-3">
                                <div className="flex items-center gap-3">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-1">
                                    <img
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    className="h-full w-full rounded-lg object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">
                                    {item.product.title}
                                    </h4>
                                    <p className="text-xs font-medium text-gray-400">{item.count} × {item.price} EGP</p>
                                </div>
                                </div>
                                <div className="text-right">
                                <span className="text-base font-extrabold text-gray-900">
                                    {item.price * item.count}
                                </span>
                                <span className="ml-1 text-[10px] font-bold text-gray-400">
                                    EGP
                                </span>
                                </div>
                            </div>
                          </>
                     })}
          </div>

          {/* Bottom Grid: Address & Order Summary */}
          <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            {/* Delivery Address Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                  <span className="rounded bg-blue-100 p-1 text-blue-600">
                    <IconMapPin className="h-3.5 w-3.5" />
                  </span>
                  <span>Delivery Address</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{shippingAddress?.city}</p>
                <p className="text-xs font-medium text-gray-400">
                  {shippingAddress?.details}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <IconPhone className="h-3.5 w-3.5 text-gray-400" />
                <span>{shippingAddress?.phone}</span>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="rounded-2xl border border-amber-200/50 bg-amber-50/70 p-4">
              <div className="flex items-center gap-2 pb-3 text-xs font-bold text-amber-900">
                <span className="rounded bg-amber-200/70 p-1 text-amber-800">
                  <IconClock className="h-3.5 w-3.5" />
                </span>
                <span>Order Summary</span>
              </div>

              <div className="space-y-2 text-xs font-medium text-amber-900/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-700">{totalOrderPrice} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-700">{shippingPrice == 0? 'Free': shippingPrice}</span>
                </div>
                <div className="flex items-center justify-between border-t border-amber-200/50 pt-2 text-sm font-black text-gray-900">
                  <span>Total</span>
                  <span>{totalOrderPrice} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}