'use client'
import { useState } from "react";
import {
  IconStarFilled,
  IconStar,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconBolt,
  IconHeart,
  IconShare,
  IconTruck,
  IconRotate2,
  IconShieldCheck,
} from '@tabler/icons-react';
import { ProductDetails } from "../types/proDetailsType";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { addProductToCart } from "@/featuers/cart/servies/cartActions";
import { toast } from "sonner";
import { cartActions } from "@/featuers/cart/slice/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductDetailsFun({ productDetailsInfo }: { productDetailsInfo:ProductDetails }) {

    const {_id, images, title, category,reviews, ratingsAverage, quantity,ratingsQuantity,price,priceAfterDiscount ,slug,brand, description} = productDetailsInfo;
  // console.log(productDetails)


  let [count, setCount] = useState<number>(1);


  let { setCartInfo } = cartActions;
  let dispatch = useDispatch();

  async function handelAdddingPro() {
    let response = await addProductToCart(_id);

    console.log(response)

    if (response.status == 'fail' || response.status == 'error') {
      toast.error(response.message);
      return;
    }

    if (response.status == 'success') {
      dispatch(setCartInfo(response));
      toast.success(response.message);
    }
  }
  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-gray-100 p-4 shadow-sm bg-white">

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              <ImageGallery
                showFullscreenButton={false}
                showNav={false}
                showPlayButton={false}
                items={
                images.map((img) => {
                  return {original: img,
                          thumbnail: img,}
                })
              } />
            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Badges */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {category.name}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-slate-600">
                {brand.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
              {title}
            </h1>

            {/* Ratings */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-amber-400">
                <IconStarFilled size={18} />
                <IconStarFilled size={18} />
                <IconStarFilled size={18} />
                <IconStarFilled size={18} />
                <IconStar size={18} className="text-gray-300" />
              </div>
              <span className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">{ ratingsAverage}</span> ({reviews.length} reviews)
              </span>
            </div>

            {/* Price section */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-slate-900">
                {priceAfterDiscount || price} EGP
              </span>
              {priceAfterDiscount? <span className="text-lg font-medium text-gray-400 line-through">
                {price} EGP
              </span>:''}
              {
                priceAfterDiscount? <span className="rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  save { (((price - priceAfterDiscount) / price) * 100).toFixed(0)}%
              </span>:''
              }
            </div>

            {/* In Stock Badge */}
            <div className="mt-3">
              {quantity > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-slate-600 leading-relaxed">
              {description}
            </p>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="block text-xs font-medium text-slate-500">
                Quantity
              </label>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-gray-300 bg-white">
                  <button
                    type="button"
                    onClick={ ()=>{  setCount(count -1)}}
                    className="p-2 text-gray-500 hover:text-slate-900 transition active:bg-gray-100 rounded-l-lg"
                  >
                    <IconMinus size={16} />
                  </button>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => { setCount(+e.target.value) }}
                    min={1}
                    className="w-12 text-center text-sm font-semibold text-slate-800 "  />
                    
                  
                  <button
                    onClick={ ()=>{  setCount(count +1)}}
                    type="button"
                    className="p-2 text-gray-500 hover:text-slate-900 transition active:bg-gray-100 rounded-r-lg"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>
                <span className="text-xs text-slate-500">{quantity} available</span>
              </div>
            </div>

            {/* Total Price Banner */}
            <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 px-5 py-4">
              <span className="text-sm font-medium text-slate-600">
                Total Price:
              </span>
              <span className="text-xl font-extrabold text-emerald-600">
                {count*(priceAfterDiscount || price)} EGP
              </span>
            </div>

            {/* Primary Actions */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handelAdddingPro}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 px-4 font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                <IconShoppingCart size={20} className=""/>
                Add to Cart
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 px-4 font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
              >
                <IconBolt size={20} />
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-400 bg-white py-2.5 px-4 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
              >
                <IconHeart size={18} />
                Add to Wishlist
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-slate-600 transition hover:bg-gray-50"
              >
                <IconShare size={18} />
              </button>
            </div>
          </div>

          {/* Features / Benefits */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IconTruck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">
                  Free Delivery
                </h4>
                <p className="text-[11px] text-slate-500">Orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IconRotate2 size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">
                  30 Days Return
                </h4>
                <p className="text-[11px] text-slate-500">Money back</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <IconShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-800">
                  Secure Payment
                </h4>
                <p className="text-[11px] text-slate-500">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}