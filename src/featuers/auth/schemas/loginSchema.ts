import z from 'zod'

export let loginSchema = z.object({
    email: z.string().min(1, { error: 'Email is required' }).pipe(z.email({ error: 'Email is not valid ' })),
    
    password: z.string().min(1, { error: 'Password is required' })
        .regex(/[A-Z]/, { error: 'Password should contain at least one cap letter' })
        .regex(/[a-z]/, { error: 'Password should contain at least one small letter' })
        .regex(/[0-9]/, { error: 'Password should contain at least one number' })
        .regex(/[#$@&*!$%^]/, { error: 'Password should contain one specil char' }),
});


export type loginValuesType = z.infer< typeof loginSchema>