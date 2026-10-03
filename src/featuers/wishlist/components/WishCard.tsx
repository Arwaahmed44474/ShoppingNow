'use client'
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { WishlistItem } from '../types/type';
import { removeFromWishList } from '../servise/wishAction';
import { toast } from 'sonner';
import { addProductToCart } from '@/featuers/cart/servies/cartActions';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/featuers/cart/slice/cartSlice';
import Swal from 'sweetalert2'
import { wishActions } from '../slice/wishSlice';

export function WishCard({ product }: { product: WishlistItem }) {
    let { imageCover, title, price, quantity, _id ,category} = product;
    
    let { setCartInfo } = cartActions;
  let dispatch = useDispatch();
  
  let { setWishCount } = wishActions;

    async function handelremoveFromWish() {

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
                
                const removeResponse = await removeFromWishList(_id);
                console.log(removeResponse)
                if (removeResponse.data) {
                  dispatch(setWishCount(removeResponse.data?.length));
                }
                
                if (removeResponse.status == 'fail' || removeResponse.status == 'error') {
                  toast.error(removeResponse.message);
                }
                
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }
            });

    }

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
    <div className="flex flex-col gap-4 border-b border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 sm:w-2/5">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-2">
          <img
            src={imageCover}
            alt="Product"
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-xs font-medium text-gray-400">{ category.name}</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between sm:w-1/5 sm:justify-start">
        <span className="text-xs text-gray-400 sm:hidden">Price:</span>
        <span className="text-sm font-extrabold text-gray-900">{price} EGP</span>
      </div>

      {/* Stock Status */}
      <div className="flex items-center justify-between sm:w-1/5 sm:justify-start">
        <span className="text-xs text-gray-400 sm:hidden">Status:</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full ${quantity>1?'bg-emerald-50 text-emerald-600':'bg-gray-100 text-gray-700'}  px-2.5 py-0.5 text-xs font-semibold `}>
                  <span className={ `h-1.5 w-1.5 rounded-full ${quantity>1?'bg-emerald-500':'bg-gray-500'}`} />
            {quantity>1 ? 'In Stock': 'Out of Stock'} 
        </span>
      </div>

      {/* Actions (Add to Cart & Remove) */}
      <div className="flex items-center justify-end gap-2 sm:w-1/5">
        <button
                  type="button"
                  onClick={handelAdddingPro}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95 sm:flex-none"
        >
          <IconShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>

        <button
                  type="button"
                  onClick={() => {
                      handelremoveFromWish();
                  }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-500"
          aria-label="Remove item"
        >
          <IconTrash className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}