"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff, IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { SubmitErrorHandler, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { getPasswordStrength, signupSchema, signupValues } from "../../schemas/signUpSchema";
import signUpAction from "../../server/signUp.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {

  let router = useRouter();

  let {register, handleSubmit, formState:{errors}, setError,control} = useForm({
    defaultValues: {
      "name": "",
      "email":"",
      "password":"",
      "rePassword":"",
      "phone": "",
    },
    resolver: zodResolver(signupSchema),
  })

  const handelVaildRegister:SubmitHandler<signupValues> = async function (values) {
    // console.log(values);
    let response = await signUpAction(values);
    if (response.success) {
      toast.success(response.message);
      router.push('/login');
    }

    if (response.success == false) {
      if (response.fieldErrors) {
        // filedErrors: ia an obj {name: ['',''], email:['','']}
        // Object.entries(response.fieldErrors) // [[key, value], [key, value], ]

        for (const [key, message] of Object.entries(response.fieldErrors)) {
          setError(key as keyof signupValues, { message: message[0] });
          
        }
      } else {
        setError('root', { message: response.message });
      }


    }
  }
  const handelInVaildRegister:SubmitErrorHandler<signupValues> = function (errors) {
    console.log(errors);
  }


  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);


  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const strength = getPasswordStrength(passwordValue);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <div className="mb-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
        </div>

        <form
          onSubmit={handleSubmit(handelVaildRegister, handelInVaildRegister)}
          className="space-y-7"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              id="name"
              {...register('name')}
            />
            {errors.name && <p className="text-red-700 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.name.message}</p>}
           
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register('email')}
            />

           {errors.email && <p className="text-red-700 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password*
            </label>
            
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control w-full rounded-xl border border-gray-200 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-emerald-500"
                placeholder="create a strong password"
                autoComplete="off"
                id="password"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <IconEye size={18} /> : < IconEyeOff size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="rounded-md bg-red-100 px-2 py-1 text-sm text-red-700">
                *{errors.password.message}
              </p>
            )}

            {passwordValue && (
              <div className="password-requirements">
                <div className="flex items-center gap-2">
                  <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                    <div
                      className={`progress h-full transition-all duration-300 ${strength.color} ${strength.width}`}
                    ></div>
                  </div>
                  <span className={`text-xs font-semibold ${strength.textColor}`}>
                    {strength.label}
                  </span>
                </div>
              </div>
                  )}
            
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword" className="text-sm font-medium text-gray-700">
              Confirm Password*
            </label>

            <div className="relative flex items-center">
              <input
                type={showRePassword ? 'text' : 'password'}
                className="form-control w-full rounded-xl border border-gray-200 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-emerald-500"
                placeholder="confirm your password"
                autoComplete="off"
                id="rePassword"
                {...register('rePassword')}
              />
              <button
                type="button"
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Toggle confirm password visibility"
              >
                {showRePassword ? <IconEye size={18} /> : < IconEyeOff size={18} />}
              </button>
            </div>

            {errors.rePassword && (
              <p className="rounded-md bg-red-100 px-2 py-1 text-sm text-red-700">
                *{errors.rePassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 234 567 8900"
              id="phone"
              {...register('phone')}
            />

            {errors.phone && <p className="text-red-700 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.phone.message}</p>}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
                // {...register('terms')}
              />
              {/* {errors.terms && <p className="text-red-700 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.terms.message}</p>} */}
              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
          </div>

          
          {errors.root && <p className="text-red-700 bg-red-100 rounded-md px-2 py-1 text-sm">*{errors.root.message}</p>}


          <button
            type="submit"
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed w-full"
          >
            <IconUserPlus stroke={2} />

            <span>Create My Account</span>
          </button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
