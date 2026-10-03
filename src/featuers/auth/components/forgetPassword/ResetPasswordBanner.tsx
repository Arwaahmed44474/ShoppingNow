import { IconMail, IconLock, IconShieldCheck } from '@tabler/icons-react';

export default function ResetPasswordBanner() {
  return (
    <div className=" flex-col items-center justify-center p-6 text-center hidden lg:flex">
      {/* Banner Card */}
      <div className="relative flex h-72 w-full max-w-md items-center justify-center overflow-hidden rounded-3xl bg-linear-to-b from-emerald-50/60 to-emerald-100/40 p-6 shadow-sm border border-emerald-50">
        {/* Background Circles */}
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-emerald-100/50 blur-xl"></div>
        <div className="absolute top-10 -right-10 h-32 w-32 rounded-full bg-emerald-100/40 blur-lg"></div>
        <div className="absolute -bottom-10 right-10 h-44 w-44 rounded-full bg-emerald-100/60 blur-xl"></div>

        {/* Floating Icons Graphic */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {/* Left Mail Icon */}
          <div className="flex h-16 w-16 -rotate-12 items-center justify-center rounded-2xl bg-white p-3 shadow-lg shadow-emerald-900/5 border border-emerald-50">
            <IconMail size={28} className="text-emerald-500" />
          </div>

          {/* Center Lock Icon */}
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white p-4 shadow-xl shadow-emerald-900/10 border border-emerald-100">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-emerald-100/80">
              <IconLock size={40} className="text-emerald-600" />
            </div>
          </div>

          {/* Right Shield Icon */}
          <div className="flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl bg-white p-3 shadow-lg shadow-emerald-900/5 border border-emerald-50">
            <IconShieldCheck size={24} className="text-emerald-500" />
          </div>
        </div>

        {/* Dots Pagination */}
        <div className="absolute bottom-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600"></span>
        </div>
      </div>

      {/* Text Content */}
      <h2 className="mt-8 text-2xl font-black text-slate-800 sm:text-3xl">
        Reset Your Password
      </h2>
      <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-slate-500">
        Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
      </p>

      {/* Features Badge Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-1.5">
          <IconMail size={16} className="text-emerald-500" />
          <span>Email Verification</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IconShieldCheck size={16} className="text-emerald-500" />
          <span>Secure Reset</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IconLock size={16} className="text-emerald-500" />
          <span>Encrypted</span>
        </div>
      </div>
    </div>
  );
}