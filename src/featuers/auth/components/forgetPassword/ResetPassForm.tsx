
'use client';

import { useState } from 'react';
import { IconCheck, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassAction } from '../../server/forgetPass.action';
import { useSelector } from 'react-redux';
import { storeStateType } from '@/store/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .regex(/[A-Z]/, { message: 'Must contain at least one capital letter' })
      .regex(/[a-z]/, { message: 'Must contain at least one small letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one number' })
      .regex(/[#$@&*!$%^]/, { message: 'Must contain one special character' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export default function ResetPassForm() {
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    let { emailToresetPass } = useSelector((state: storeStateType) => {
        return state.authReducer
    });
    console.log('emailToresetPassssssssssss',emailToresetPass)

  const {
    register, handleSubmit, formState: { errors }} = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

    
    let router = useRouter();
    // const onValidSubmit: SubmitHandler<ResetPasswordSchemaType> = async(values) => {
    //     console.log(values, emailToresetPass);
        

    //     let forgetRespons = await resetPassAction(values.password, emailToresetPass);
                
    //         console.log(forgetRespons)
        
    //         if (forgetRespons.status == 'Success') {
    //             setTimeout(() => { 
    //                 router.push('/login')
    //             }, 2000);
    //         }
        

    // };
    const [isLoading, setIsLoading] = useState(false);

    const onValidSubmit: SubmitHandler<ResetPasswordSchemaType> = async (values) => {
    try {
        setIsLoading(true);

        if (!emailToresetPass) {
        toast.error("Email session expired. Please start the process again.");
        router.push("/forget-password");
        return;
        }

        const resetResponse = await resetPassAction(values.password, emailToresetPass);
        console.log("Reset Password Response:", resetResponse);

        if (resetResponse?.status === "Success" ) {
        toast.success("Password reset successfully!");

        setTimeout(() => {
            router.push("/login");
        }, 1500);
        }
        // else {
        //   toast.error(resetResponse?.message || "Failed to reset password. Please try again.");
        // }
    } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("An unexpected error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
        };
    

    const onINValidSubmit: SubmitErrorHandler<ResetPasswordSchemaType> = function (errors) {
            console.log(errors);
    };
    
  return (
    <div className="flex w-full  flex-col justify-center rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
      {/* Brand Logo & Header */}
      <div className="text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Fresh<span className="text-emerald-600">Cart</span>
        </h1>
        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Create New Password
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-400">
          Your new password must be different from previous passwords
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="my-8 flex items-center justify-center gap-3">
        {/* Step 1 - Completed */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
          <IconCheck size={18} stroke={3} />
        </div>

        <div className="h-0.5 w-12 bg-emerald-500"></div>

        {/* Step 2 - Completed */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
          <IconCheck size={18} stroke={3} />
        </div>

        <div className="h-0.5 w-12 bg-emerald-500"></div>

        {/* Step 3 - Active */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-100">
          <IconLock size={18} />
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onValidSubmit, onINValidSubmit)} className="space-y-4">
        {/* New Password */}
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="password" className="text-xs font-semibold text-slate-700">
            New Password
          </label>
          <div className="relative flex items-center">
            <IconLock size={18} className="absolute left-3.5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              placeholder="Enter new password"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showPassword ? <IconEye size={18} /> : < IconEyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-red-600">
              *{errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-700">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <IconLock size={18} className="absolute left-3.5 text-slate-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword')}
              placeholder="Confirm new password"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showConfirmPassword ? < IconEye size={18} /> : <IconEyeOff size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs font-medium text-red-600">
              *{errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
            {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
      </form>
    </div>
  );
}