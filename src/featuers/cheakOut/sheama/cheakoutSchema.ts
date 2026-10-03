import z from "zod";

export const validShippingInfo = z.object({
    details: z.string().nonempty('details is requird')
        .min(10, { error: 'adress must be at least 10 char' }).max(200, { error: 'addressmax 200 char' }),
    
    phone: z.string().nonempty('phone is requird')
        .regex(/^(011|012|015|010)[0-9]{8}$/, 'Phone number must be a valid 11-digit Egyptian number'),
    
    city: z.string().nonempty('city is requird')
        .min(2, { error: 'city must be at least 2 char' })
        .max(200, { error: 'city max 200 char' })
});

export type shippingaddresstype = z.infer<typeof validShippingInfo>