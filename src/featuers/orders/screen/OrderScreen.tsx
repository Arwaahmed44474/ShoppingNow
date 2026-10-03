'use client'
import { IconArrowLeft, IconArrowRight, IconShoppingBag, IconSparkles } from "@tabler/icons-react"
import Link from "next/link"
import { getUserOrders } from "../service/orders.actions";
import { OrderCard } from "../components/OrderCard";
import { useSelector } from "react-redux";
import { storeStateType } from "@/store/store";
import { useEffect, useState } from "react";
import { OrdersResponse } from "../type/ordersType";


export default function OrderScreen() {
    let {userInfo } = useSelector((state: storeStateType) => {
        return state.authReducer
    });

    const [orders, setOrders] = useState<null | OrdersResponse>(null);

    if (!userInfo) {
        return;
    }

    useEffect(() => {
        const fetchOrders = async () => {
            if(! userInfo.id) return
            let orderResponse = await getUserOrders({ id: userInfo?.id });
            setOrders(orderResponse);
        }
        fetchOrders();
    }, []);

    
    
    // console.log(orderResponse)
    if (!orders || orders.length == 0)  {
        return <>
            <div className="container py-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <nav className="text-xs text-gray-400 mb-1">
              <Link className="hover:text-primary-600" href={'/'}>Home</Link>  / <span className="text-primary-600 font-medium">My orders</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Order</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Track and manage your  .</p>
          </div>

          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-primary-600 transition-colors"
          >
            <IconArrowLeft className="size-4" />
            <span>Back to Cart</span>
          </Link>
                </div>
                

                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-emerald-50/30 px-6 py-12 text-center shadow-sm">
      {/* Icon Badge */}
      <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
        <IconShoppingBag className="h-10 w-10" />
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-amber-950">
          <IconSparkles className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900">Your Cart is Empty</h3>
      <p className="mt-1.5 max-w-sm text-sm font-medium text-gray-500">
        Looks like you haven't added anything to your cart yet. Explore our latest arrivals and start shopping!
      </p>

      {/* Action Button */}
      <Link
        href={'/'}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95"
      >
        <span>Start Shopping Now</span>
        <IconArrowRight className="h-4 w-4" />
      </Link>
    </div>
            </div>
        </>
    }

  return  (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container ">
        
        {/*  Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <nav className="text-xs text-gray-400 mb-1">
              <Link className="hover:text-primary-600" href={'/'}>Home</Link>  / <span className="text-primary-600 font-medium">My orders</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">My Order</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Track and manage your {orders.length} {orders.length <= 1? 'order':'orders'}.</p>
          </div>

          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-primary-600 transition-colors"
          >
            <IconArrowLeft className="size-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

              {/*  */}

              <div className="space-y-3">
                  {orders.map((order) => {
                      return <OrderCard order ={ order} key={order._id}/>
                  })}
              </div>
          </div>
          
    </div>
  );
}
