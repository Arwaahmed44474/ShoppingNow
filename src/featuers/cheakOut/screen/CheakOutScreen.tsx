'use client'
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import OrderSummary from "../components/OrderSummary";
import ShippingForm from "../components/ShippingForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingaddresstype, validShippingInfo } from "../sheama/cheakoutSchema";
import { useState } from "react";
import { cashCheakout, onlineCheakout } from "../servise/cheakOutActions";
import { useSelector } from "react-redux";
import { storeStateType } from "@/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function CheakoutScreen() {

      let {cartId}  = useSelector((state: storeStateType) => { return state.cartReducer});
    
    let router = useRouter();

    let { register, formState: { errors }, handleSubmit ,reset} = useForm({
        defaultValues: {
            details: '',
            phone: '',
            city: '',
        },
        resolver: zodResolver(validShippingInfo),
    });

    let [payMethode, setPayMethode] = useState<'cash' | 'online'>('cash');


    const onValidSubmit: SubmitHandler<shippingaddresstype> = async (values) => {
        try {
            if (cartId == null) return;

            if (payMethode == 'cash') {
                let response = await cashCheakout({ cartId, shippingAddress: values });
                console.log(response);
                // clearCart();
                if (response.status == 'success') {
                    toast.success(response.message);
                    setTimeout(() => {
                        router.push('/myorders');
                    },2000)
                    reset();
                }
            } else {
                let url = location.origin;
                let response = await onlineCheakout({ cartId, shippingAddress: values , url});
                // clearCart();
                console.log(response);
                if (response.status == 'success') {
                    toast.loading('redirected you to payment gatway');
                    setTimeout(() => {
                        location.href = response.session.url;
                    },2000)
                    reset();
                }
            }


            
        } catch (error) {
            
        }

    }

    

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container ">
        
        {/* Breadcrumb / Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <nav className="text-xs text-gray-400 mb-1">
              <Link className="hover:text-primary-600" href={'/'}>Home</Link> / <Link href={'/cart'} className="hover:text-primary-600">Cart</Link> / <span className="text-primary-600 font-medium">Checkout</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Complete Your Order</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Review your items and complete your purchase.</p>
          </div>

          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-primary-600 transition-colors"
          >
            <IconArrowLeft className="size-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        {/* Main Grid Layout (Form on Left, Summary on Right) */}
        <form onSubmit={handleSubmit(onValidSubmit)}  className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Form & Method */}
          <div  className="lg:col-span-2">
                <ShippingForm register={register} errors={ errors} payMethode={payMethode} setPayMethode={ setPayMethode}/>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
                      <OrderSummary  />
          </div>

        </form>

      </div>
    </div>
  );
}