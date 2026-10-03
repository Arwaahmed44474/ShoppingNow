"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconBrandFacebook,
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
  IconLockFilled,
  IconMail,
  IconStarFilled,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, loginValuesType } from "../../schemas/loginSchema";
import { loginAction } from "../../server/login.action";
import { setToken } from "../../server/auth.actions";
import { authActions } from "../../slices/auth.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function LoginForm() {


  const { setAuthState } = authActions;
  const dispatch = useDispatch();




  let router = useRouter();


  let {register, handleSubmit,setError,  formState:{errors}} = useForm({
    defaultValues: {
      "email":"",
      "password":""
    },
    resolver: zodResolver(loginSchema)
  });

  const validLogin :SubmitHandler <loginValuesType> = async function (values) {
    console.log(values);
    let respose = await loginAction(values);
    
    if (respose.success) {
      toast.success(respose.message);
      router.push('/');

      // save in cookies
      await setToken(respose.data.token);

      dispatch(setAuthState({
        isAuthenticated: true,
        userInfo: {
          name: respose.data.user.name,
          role: respose.data.user.role,
          email:respose.data.user.email
        }
      }));
    }
    if (respose.success == false) {
      if (respose.fieldErrors) {
        for (const [key, message] of Object.entries(respose.fieldErrors)) {
          setError(key as keyof loginValuesType, { message: message[0] });
        }
       
      } else {
        setError('root', { message: respose.message });
         console.log('sdsds');
      }
    }
  }

  const inValidLogin: SubmitErrorHandler<loginValuesType> = function (errors) {
    console.log(errors);
  }

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <IconBrandGoogleFilled className="text-red-500 text-lg" />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <IconBrandFacebook stroke={2} className="text-blue-600 text-lg" />

            <span className="font-medium text-gray-700">
              Continue with Facebook
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6"  onSubmit={handleSubmit(validLogin, inValidLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your email"
                id="email"
                {...register('email')}
              />
              <IconMail
                stroke={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

           {errors.email && <p className="text-red-700 mt-1 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <Link
                href="/forget-password"
                className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your password"
                {...register('password')}
              />
              <IconLockFilled className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4  text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <IconEye size={18} /> : < IconEyeOff size={18} />}
              </button>
            </div>

           
            {errors.password && <p className="text-red-700 mt-1 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.password.message}</p>}
         
          </div>

          
            {errors.root && <p className="text-red-700 mt-1 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.root.message}</p>}
         
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Keep me signed in
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            New to FreshCart?
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center">
            <IconLockFilled className="mr-1" />
            SSL Secured
          </div>
          <div className="flex items-center">
            <IconUsers stroke={2} className="mr-1" />
            50K+ Users
          </div>
          <div className="flex items-center">
            <IconStarFilled className="mr-1" />
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  );
}
