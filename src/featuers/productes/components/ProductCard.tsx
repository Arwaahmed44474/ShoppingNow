'use client'
import { 
  IconHeart, 
  IconRefresh, 
  IconEye, 
  IconStarFilled, 
  IconStar, 
  IconPlus 
} from '@tabler/icons-react';
import { Product } from '../types/Protypex';
import Link from 'next/link';
import { cartActions } from '@/featuers/cart/slice/cartSlice';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '@/featuers/cart/servies/cartActions';
import { toast } from 'sonner';
import { addToWishList } from '@/featuers/wishlist/servise/wishAction';
import { wishActions } from '@/featuers/wishlist/slice/wishSlice';


export default function ProductCard({ product }: { product: Product }) {
  
  let { imageCover, title, category, price, priceAfterDiscount, ratingsQuantity, ratingsAverage, _id } = product;
  


  let { setCartInfo } = cartActions;
  let {setWishCount } = wishActions;
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

  async function handelAddtowish() {
    const wishResponse = await addToWishList(_id);

    if (wishResponse.status === 'success') {
      toast.success('Product added to wishlist');

      
      if (wishResponse.data) {
        dispatch(setWishCount(wishResponse.data.length));
        console.log(wishResponse);
      }
      
    } else {
      toast.error(wishResponse.message || 'Failed to add product');
    }
  }

  return (
    <div className="relative w-full  rounded-2xl border border-gray-200 bg-white p-4  shadow-sm hover:shadow-md  hover:-translate-y-1 transition-all duration-400">
      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button 
          type="button"

          onClick={() => {
            handelAddtowish();
          }}
          aria-label="Add to wishlist"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition hover:bg-gray-50 hover:text-red-700"
        >
          <IconHeart size={18} stroke={1.5} />
        </button>
        <button 
          type="button"
          aria-label="Compare product"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition hover:bg-gray-50 hover:text-primary-600"
        >
          <IconRefresh size={18} stroke={1.5} />
        </button>
        <Link 
          href= {`/products/${_id}`}

          aria-label="Quick view"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition hover:bg-gray-50 hover:text-primary-600"
        >
          <IconEye size={18} stroke={1.5} />
        </Link>
      </div>

      {/* Product Image */}
      <div className="flex h-56 w-full items-center justify-center overflow-hidden rounded-xl">
        <img
          src={imageCover}
          alt={title}
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* Product Content */}
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-500">
          {category.name}
        </span>
        <h3 className="text-lg font-semibold text-slate-800 leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              star <= Math.round(ratingsAverage) ? (
                <IconStarFilled key={star} size={16} />
              ) : (
                <IconStar key={star} size={16} className="text-gray-300" />
              )
            ))}
          </div>
          <span className="ml-1 text-xs font-medium text-slate-600">
            {ratingsAverage} <span className="text-slate-400">({ratingsQuantity})</span>
          </span>
        </div>

        {/* Price & Add Button */}
        <div className="mt-3 flex items-center justify-between">
          <div className='space-x-1'>
            <span className="text-xl font-bold text-primary-500"> {priceAfterDiscount || price} EGP </span>
            {priceAfterDiscount ? <span className="text-lg  text-slate-500 line-through"> {price} EGP </span>:''}
          </div>
          
          <button
            type="button"
            onClick={handelAdddingPro}
            aria-label="Add to cart"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md transition hover:bg-emerald-700 active:scale-95"
          >
            <IconPlus size={22} stroke={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}