'use client';

import Link from 'next/link';
import { IconMail, IconKey, IconLock, IconArrowLeft } from '@tabler/icons-react';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPassAction } from '../../server/forgetPass.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../slices/auth.slice';
import { storeStateType } from '@/store/store';

// 1. إصلاح وتعديل Zod Schema
const forgetPassSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not valid' }),
});

type ForgetPassSchemaType = z.infer<typeof forgetPassSchema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPassSchemaType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgetPassSchema),
  });


  const router = useRouter();
  const dispatch = useDispatch();
  const { setEmailToresetPass } = authActions;

  const onValidSubmit: SubmitHandler<ForgetPassSchemaType> = async (values) => {
    
    dispatch(setEmailToresetPass({ emailToresetPass: values.email }));

    
    const forgetResponse = await forgetPassAction(values.email);

    console.log('Response:', forgetResponse);

    if (forgetResponse?.statusMsg === 'success') {
      toast.success(forgetResponse.message);

      setTimeout(() => {
        router.push('/verify-code');
      }, 1500);
    } else {
      toast.error(forgetResponse?.message || 'Something went wrong');
    }
  };

  const inValidLogin: SubmitErrorHandler<ForgetPassSchemaType> = (errors) => {
    console.log('Validation Errors:', errors);
  };

  return (
    <div className="flex w-full flex-col justify-center rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
      {/* Brand Logo */}
      <div className="text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Fresh<span className="text-emerald-600">Cart</span>
        </h1>
        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Forgot Password?
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-400">
          No worries, we'll send you a reset code
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="my-8 flex items-center justify-center gap-3">
        {/* Step 1 - Active */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-100">
          <IconMail size={18} />
        </div>

        <div className="h-0.5 w-12 bg-slate-200"></div>

        {/* Step 2 */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <IconKey size={18} />
        </div>

        <div className="h-0.5 w-12 bg-slate-200"></div>

        {/* Step 3 */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <IconLock size={18} />
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onValidSubmit, inValidLogin)} className="space-y-5">
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="email" className="text-xs font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative flex items-center">
            <IconMail size={18} className="absolute left-3.5 text-slate-400" />
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          {/* عرض رسالة الخطأ */}
          {errors.email && (
            <p className="mt-1 text-xs font-medium text-red-600">
              *{errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
        >
          Send Reset Code
        </button>
      </form>

      {/* Back to Sign In Link */}
      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
        >
          <IconArrowLeft size={16} />
          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* Footer Divider */}
      <div className="mt-8 border-t border-slate-100 pt-6 text-center">
        <p className="text-xs font-medium text-slate-500">
          Remember your password?{' '}
          <Link href="/login" className="font-bold text-emerald-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}