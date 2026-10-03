import z, { regex } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(1, { error: 'Name is required' }),
    email: z.email({ error: 'Enter valid email' }).min(1, { error: 'Email is required' }),
    password: z.string().min(1, { error: 'Password is required' })
        .regex(/[A-Z]/, { error: 'Password should contain at least one cap letter' })
        .regex(/[a-z]/, { error: 'Password should contain at least one small letter' })
        .regex(/[0-9]/, { error: 'Password should contain at least one number' })
        .regex(/[#$@&*!$%^]/, { error: 'Password should contain one specil char' }),
    
    rePassword: z.string().min(1, { error: 'rePassword is required' }),

    phone: z.string().min(1, { error: 'Phone number is required' })
        .regex(/^01[0125][0-9]{8}$/, { error: 'Enter a valid Egyption number' }),
    
    // terms: z.boolean().refine((value) => value != true ,{error:''})
    
}).refine((data) => {
    return data.password == data.rePassword
}, {error:'Password and rePassord should be equal' , path:['rePassword']});


export type signupValues = z.infer<typeof signupSchema>




export const getPasswordStrength = (password: string) => {
  if (!password) return { width: 'w-0', color: 'bg-gray-200', label: '', textColor: 'text-gray-400' };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[#$@&*!$%^]/.test(password)) score++;

  if (score <= 2) {
    return { width: 'w-1/3', color: 'bg-red-500', label: 'Weak', textColor: 'text-red-500' };
  }
  if (score <= 4) {
    return { width: 'w-2/3', color: 'bg-orange-500', label: 'Fair', textColor: 'text-orange-500' };
  }
  return { width: 'w-full', color: 'bg-emerald-500', label: 'Strong', textColor: 'text-emerald-600' };
};