'use client';

import Link from 'next/link';
import { IconCheck, IconKey, IconLock, IconShield, IconArrowLeft } from '@tabler/icons-react';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyResetCode } from '../../server/forgetPass.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .min(1, { message: 'Reset code is required' })
    .max(6, { message: 'Code must be exactly 6 digits' }),
});

type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;

export default function VerifyCodeForm({ email = 'usama.route@gmail.com' }: { email?: string }) {
  const { register, handleSubmit, formState: { errors }} = useForm<VerifyCodeSchemaType>({
    defaultValues: {
      resetCode: '',
    },
    resolver: zodResolver(verifyCodeSchema),
  });

    let router = useRouter();
  const onValidSubmit: SubmitHandler<VerifyCodeSchemaType> = async (values) => {
      console.log(values);

      let forgetRespons = await verifyResetCode(values.resetCode);
        
        console.log(forgetRespons)

        if (forgetRespons.status == 'Success') {
            setTimeout(() => { 
                router.push('/creat-new-password')
            }, 2000);
        }
    };
    
    const inValidLogin: SubmitErrorHandler<VerifyCodeSchemaType> = function (errors) {
        console.log(errors);
    };


  return (
    <div className="flex w-full flex-col justify-center rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50">
      {/* Brand Logo & Header */}
      <div className="text-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-800">
          Fresh<span className="text-emerald-600">Cart</span>
        </h1>
        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Check Your Email
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Enter the 6-digit code sent to <span className="font-semibold text-slate-700">{email}</span>
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="my-8 flex items-center justify-center gap-3">
        {/* Step 1 - Completed */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
          <IconCheck size={18} stroke={3} />
        </div>

        <div className="h-0.5 w-12 bg-emerald-500"></div>

        {/* Step 2 - Active */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-100">
          <IconKey size={18} />
        </div>

        <div className="h-0.5 w-12 bg-slate-200"></div>

        {/* Step 3 - Pending */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <IconLock size={18} />
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onValidSubmit, inValidLogin)} className="space-y-4">
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="resetCode" className="text-xs font-semibold text-slate-700">
            Verification Code
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="resetCode"
              maxLength={6}
              {...register('resetCode')}
              placeholder="• • • • • •"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 text-center text-lg font-bold tracking-[0.4em] text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <IconShield size={14} />
          </div>

          {errors.resetCode && (
            <p className="text-xs font-medium text-red-600">
              *{errors.resetCode.message}
            </p>
          )}
        </div>

        {/* Resend Code Link */}
        <div className="text-center text-xs font-medium text-slate-500">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="font-bold text-emerald-600 hover:underline"
          >
            Resend Code
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
        >
          Verify Code
        </button>
      </form>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-600"
        >
          <IconArrowLeft size={16} />
          <span>Change email address</span>
        </Link>
      </div>
    </div>
  );
}