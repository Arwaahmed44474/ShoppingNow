'use client'
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { CartItem } from "../types/cartType";
import { removeProductfromCart, updateProCount } from '../servies/cartActions';
import { toast } from 'sonner';
import { cartActions } from '../slice/cartSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'

export default function CartItemCard({ productInfo }:{productInfo: CartItem}) {
    const { product, count,price } = productInfo;
  const { imageCover, category, _id, title, quantity } = product
  

  let { setCartInfo } = cartActions;
  let dispatch = useDispatch();

   function handelDelePro() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {

      if (result.isConfirmed) {
        
        let response = await removeProductfromCart(_id);
        if (response.status == 'fail' || response.status == 'error') {
          toast.error(response.message);
        }
        if (response.status == 'success') {
          // toast.success(response.message);
          dispatch(setCartInfo(response))
        }
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  async function handelUpdatePro(newCount: number) {
    if (newCount < 1) return;

    try {
      let response = await updateProCount(_id, newCount);
      if (response.status == 'success') {
        dispatch(setCartInfo(response));
      }else {
          toast.error(response.message);
        }
      
    } catch (error) {
      throw error;
    }

  
  }

  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Product Image & Info */}
      <div className="flex w-full items-center gap-4 sm:w-auto">
        {/* Image Container */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2 border border-gray-100">
          <img
            src={imageCover}
            alt="Woman Shawl"
            className="h-full w-full object-contain object-center"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold text-slate-900">
            {title}
          </h3>

          <div>
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-600">
              {category.name}
            </span>
          </div>

          <span className="text-base font-extrabold text-emerald-600">
            {price} EGP
          </span>

          {/* Quantity Controls */}
          <div className="mt-1 flex items-center w-fit rounded-lg border border-gray-200 bg-gray-50/50 p-1">
            <button
              type="button"
              onClick={()=>{ handelUpdatePro(count - 1)}}
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:text-slate-800 transition active:scale-95"
            >
              <IconMinus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-slate-800">
              {count}
            </span>
            <button
              type="button"
              disabled={ count >= quantity}
              onClick={()=>{ handelUpdatePro(count + 1)}}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition active:scale-95"
            >
              <IconPlus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Price & Delete Action */}
      <div className="mt-4 flex w-full items-end justify-between sm:mt-0 sm:w-auto sm:flex-col sm:items-end sm:gap-4">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">Total</span>
          <span className="text-lg font-extrabold text-slate-900">
            {price*count} <span className="text-xs font-normal text-gray-400">EGP</span>
          </span>
        </div>

        <button
          type="button"
           onClick={handelDelePro} 
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 active:scale-95"
          aria-label="Remove item"
        >
          <IconTrash size={18} />
        </button>
      </div>
    </div>
  );
}