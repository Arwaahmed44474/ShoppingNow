"use client";

import Link from "next/link";
import logo from '../../assets/images/freshcart-logo.svg';
import Image from "next/image";
import { useState } from "react";
import { 
  IconBabyCarriage, 
  IconChevronDown, 
  IconDotsVertical, 
  IconHeadset, 
  IconHeart, 
  IconId, 
  IconLogout, 
  IconMail, 
  IconMenu2, 
  IconPhone, 
  IconProgressBolt, 
  IconReportMedical, 
  IconSearch, 
  IconShirtSport, 
  IconShoppingCart, 
  IconUser, 
  IconUserPlus,
  IconX
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { storeStateType } from "@/store/store";
import { authActions } from "@/featuers/auth/slices/auth.slice";
import { deleteToken } from "@/featuers/auth/server/auth.actions";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useSelector((allStoreStates: storeStateType) => {
    return allStoreStates.authReducer;
  });

  const { numOfCartItems } = useSelector((allStoreStates: storeStateType) => { 
    return allStoreStates.cartReducer;
  });

  let { count } = useSelector((allStoreStates: storeStateType) => { 
    return allStoreStates.wishReducer;
  });

  const { logout } = authActions;
  const dispatch = useDispatch();
  let router = useRouter();

  async function handelLogout() {
    dispatch(logout());
    await deleteToken();
    router.push('/login');
    setIsOpen(false);
  }

  console.log(count)
  return (
    <>
      <header>
        <div className="container mx-auto px-4">
          {/* Top Navbar */}
          <div className="hidden lg:flex border-b text-sm border-gray-500/10 py-2 justify-between items-center *:flex *:gap-6">
            <ul className="*:flex *:gap-2 *:items-center">
              <li>
                <IconPhone stroke={2} />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li>
                <IconMail stroke={2} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
            </ul>

            <ul>
              <li>
                <Link href={`/track-order`}>Track Order</Link>
              </li>
              <li>
                <Link href={`/about`}>About</Link>
              </li>
              <li>
                <Link href={`/contact`}>Contact</Link>
              </li>
              <li>
                <select>
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </li>
              <li>
                <select>
                  <option>العربية</option>
                  <option>English</option>
                </select>
              </li>
            </ul>
          </div>

          {/* Main Navigation */}
          <nav className="py-4 flex justify-between items-center">
            <h1>
              <Link href={`/`}>
                <Image src={logo} alt="Freshcart Logo" />
              </Link>
            </h1>

            <search className="relative hidden lg:flex">
              <input
                type="text"
                className="form-control w-96"
                placeholder="Search for products ..."
              />
              <IconSearch stroke={2}  className="absolute right-3 top-1.5"/>
            </search>

            <div className="relative flex items-center gap-4 lg:hidden">
              <Link href={`/wishlist`} className="text-gray-600 hover:text-red-600">
                <IconHeart stroke={1.5} className="size-6" />
                <span className="absolute top-0 left-2.5 size-5 rounded-full bg-red-600 text-white text-xs font-bold flex justify-center items-center">
                  {count}
                </span>
              </Link>

              <Link href={`/cart`} className="relative text-gray-600 hover:text-primary-600">
                <IconShoppingCart stroke={1.5} className="size-6" />
                <span className="absolute -top-2 -right-2 size-5 rounded-full bg-primary-600 text-white text-xs font-bold flex justify-center items-center">
                  {numOfCartItems}
                </span>
              </Link>

              <button 
                onClick={() => setIsOpen(true)}
                className="size-10 rounded-full bg-primary-600 text-white flex justify-center items-center shadow-md hover:bg-primary-700 transition-colors"
                aria-label="Open menu"
              >
                <IconMenu2 stroke={2} className="size-6" />
              </button>
            </div>

            {/* قائمة أجهزة الكمبيوتر (Desktop) */}
            <menu className="hidden lg:flex gap-6 *:hover:text-primary-500 *:transition-colors *:duration-200">
              
              <li>
                <Link href={`/wishlist`} className="flex flex-col gap-2 items-center">
                  <div className="relative">
                    <IconHeart stroke={2} />
                    <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center">
                        {count}
                      </span>
                    
                  </div>
                  <span className="text-sm">Wishlist</span>
                </Link>
              </li>

              <li>
                <Link href={`/cart`} className="flex flex-col gap-2 items-center">
                  <div className="relative">
                    <IconShoppingCart stroke={2} />
                    <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                      {numOfCartItems}
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link href={`/account`} className="flex flex-col gap-2 items-center">
                      <IconUser stroke={2} />
                      <span className="text-sm">Account</span>
                    </Link>
                  </li>
                  <li 
                    className="flex flex-col gap-2 cursor-pointer items-center"
                    onClick={() => handelLogout()}
                  >
                    <IconLogout stroke={2} />
                    <span className="text-sm">Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={`/signup`} className="flex flex-col gap-2 items-center">
                      <IconUserPlus stroke={2} />
                      <span className="text-sm">Signup</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/login`} className="flex flex-col gap-2 items-center">
                      <IconId stroke={2} />
                      <span className="text-sm">Login</span>
                    </Link>
                  </li>
                </>
              )}
            </menu>
          </nav>
        </div>

        {/* Category Navigation (Desktop) */}
        <nav className="hidden lg:block bg-gray-100 py-4">
          <div className="container mx-auto flex gap-6 items-center">
            <div className="group/categories relative">
              <button className="btn bg-primary-600 text-white flex gap-2 items-center">
                <IconMenu2 stroke={2} />
                <span>All Categories</span>
                <IconChevronDown stroke={2} />
              </button>

              <ul className="hidden divide-y-2 divide-gray-300/20 shadow-xl group-hover/categories:flex flex-col absolute z-50 top-10 left-0 rounded-md bg-white w-60 *:bg-white *:hover:bg-gray-100 *:transition-colors *:duration-200">
                <li>
                  <Link href={`/categories/6439d5b90049ad0b52b90048`} className="p-3 flex gap-3 items-center">
                    <IconUser stroke={2} />
                    <span>Men's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/categories/6439d58a0049ad0b52b9003f`} className="p-3 flex gap-3 items-center">
                    <IconShirtSport stroke={2} />
                    <span>Women's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/categories/6439d40367d9aa4ca97064cc`} className="p-3 flex gap-3 items-center">
                    <IconBabyCarriage stroke={2} />
                    <span>Baby & Toys</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/categories/6439d30b67d9aa4ca97064b1`} className="p-3 flex gap-3 items-center">
                    <IconReportMedical stroke={2} />
                    <span>Beauty & Health</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/categories/6439d2d167d9aa4ca970649f`} className="p-3 flex gap-3 items-center">
                    <IconProgressBolt stroke={2} />
                    <span>Electronics</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/categories`} className="p-3 flex gap-3 items-center">
                    <IconDotsVertical stroke={2} />
                    <span>View All Categories</span>
                  </Link>
                </li>
              </ul>
            </div>

            <menu className="flex gap-4">
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <Link href={`/cart`}>Recently Added</Link>
              </li>
              <li>
                <Link href={`/`}>Featured Products</Link>
              </li>
              <li>
                <Link href={`/offers`}>Offers</Link>
              </li>
              <li>
                <Link href={`/brands`}>Brands</Link>
              </li>
            </menu>
          </div>
        </nav>

        {isOpen && (
          <>
            {/*  shadooo */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity "
              onClick={() => setIsOpen(false)}
            ></div>

            {/* جسم القائمة الجانبية */}
            <div className="fixed top-0 bottom-0 right-0 w-80 bg-white shadow-2xl z-500 overflow-y-auto flex flex-col p-5 lg:hidden">
              {/* Header */}
              <div className="flex justify-between items-center pb-4">
                <Image src={logo} alt="FreshCart Logo" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <IconX stroke={2} className="size-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative my-3">
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-primary-600"
                  placeholder="Search products..."
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-1.5 rounded-md hover:bg-primary-700">
                  <IconSearch stroke={2} className="size-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="my-2">
                <ul className="flex flex-col space-y-4 py-2 text-gray-700 font-medium text-sm">
                  <li>
                    <Link href={`/`} onClick={() => setIsOpen(false)} className="hover:text-primary-600 block">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href={`/cart`} onClick={() => setIsOpen(false)} className="hover:text-primary-600 block">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href={`/categories`} onClick={() => setIsOpen(false)} className="hover:text-primary-600 block">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href={`/brands`} onClick={() => setIsOpen(false)} className="hover:text-primary-600 block">
                      Brands
                    </Link>
                  </li>
                </ul>
              </nav>

              <hr className="my-3 border-gray-100" />

              {/* Wishlist & Cart Cards */}
              <div className="flex flex-col gap-2 my-2">
                <Link 
                  href={`/wishlist`} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between gap-3 p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-white text-red-500 shadow-sm">
                        <IconHeart stroke={2} className="size-5" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm">Wishlist</span>
                  </div>

                  <span className="size-6 rounded-full bg-red-600 text-white text-xs font-bold flex justify-center items-center">
                    {count}
                  </span>
                </Link>

                <Link 
                  href={`/cart`} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white text-primary-600 shadow-sm">
                      <IconShoppingCart stroke={2} className="size-5" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm">Cart</span>
                  </div>
                  <span className="size-6 rounded-full bg-primary-600 text-white text-xs font-bold flex justify-center items-center">
                    {numOfCartItems}
                  </span>
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="mt-4 pt-2">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link 
                      href={`/account`}
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700"
                    >
                      Account
                    </Link>
                    <button
                      onClick={handelLogout}
                      className="w-full text-center py-2.5 rounded-lg border border-red-500 text-red-500 font-medium text-sm hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      href={`/login`}
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700"
                    >
                      Sign In
                    </Link>
                    <Link 
                      href={`/signup`}
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-2.5 rounded-lg border border-primary-600 text-primary-600 font-medium text-sm hover:bg-primary-50"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Need Help Footer Card */}
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <div className="p-2.5 rounded-full bg-emerald-100 text-emerald-600">
                    <IconHeadset stroke={2} className="size-5" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-gray-800">Need Help?</span>
                    <Link href={`/contact`} onClick={() => setIsOpen(false)} className="text-primary-600 font-medium hover:underline">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </header>
    </>
  );
}