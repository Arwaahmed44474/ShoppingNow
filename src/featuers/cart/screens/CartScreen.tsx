'use client'
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';
import CartItemCard from '../components/CartItemCard';
import OrderSummaryCard from '../components/OrderSummaryCard';
import { useDispatch, useSelector } from 'react-redux';
import { storeStateType } from '@/store/store';
import Link from 'next/link';
import { cartActions } from '../slice/cartSlice';
import { toast } from 'sonner';
import Swal from 'sweetalert2'
import { clearCart } from '../servies/cartActions';

export default function CartScreen() {

  let CartRespose  = useSelector((allStoreStates: storeStateType) => { return allStoreStates.cartReducer});

  
  if (CartRespose.status == 'fail' || CartRespose.status == 'error') {
    return <h1>Error</h1>
  }
  console.log(CartRespose);

  
  
  
  if (!CartRespose) {
    return <div className="container py-16 text-center">Loading...</div>;
  }



  let { setCartInfo } = cartActions;
  let dispatch = useDispatch();
  function handelClearCart() {
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
        
        let response = await clearCart();
        if (response.status == 'fail' || response.status == 'error') {
          toast.error(response.message);
        }
        if (response.status == 'success') {
          toast.success(response.message);
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

  if (CartRespose.status == 'success') {
    return (
      <div className="container py-16">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-slate-500">
          <a href="#" className="hover:underline">Home</a>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-800">Shopping Cart</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <IconShoppingCart size={22} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Shopping Cart
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            You have <span className="font-bold text-emerald-600">{CartRespose.numOfCartItems} {CartRespose.numOfCartItems>1?'items':'item'}</span> in your cart
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Cart Items & Actions */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="space-y-4">
              {CartRespose.data.products.map((product) => {
                return <>
                  <CartItemCard key={product._id} productInfo={ product} />
                </>
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:underline"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={handelClearCart}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition"
              >
                <IconTrash size={15} />
                <span>Clear all items</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <OrderSummaryCard key={CartRespose.cartId} summeryInf={ CartRespose} />
          </div>
        </div>
      </div>
    );
  }
}