'use server'
import { AxiosRequestConfig, isAxiosError } from 'axios';
import { signupSchema, signupValues } from './../schemas/signUpSchema';
import z from 'zod'
import { apiClient } from '@/services/apiClient';

type filedErrorsType = Partial<Record<keyof signupValues, string[]>>;

type singupActionReturn = { success: true, message: string } | { success: false, message: string, fieldErrors?: filedErrorsType };

export default async function signUpAction(values:signupValues) : Promise<singupActionReturn>{
    let secondValResulte = signupSchema.safeParse(values);
    console.log({ secondValResulte });
    
    if (secondValResulte.success == false) {
        const { formErrors, fieldErrors } = z.flattenError(secondValResulte.error);
        return {
            success: false,
            message: formErrors[0] ?? '',
            fieldErrors
        }
    }

    try {
        let option: AxiosRequestConfig = {
            method: 'POST',
            url: '/auth/signup',
            data:secondValResulte.data
        };

        await apiClient.request(option);

        return {
            success: true,
            message:'account is created sucsessfuly'
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data.message??'can not access server'
            }
        }

        return {
            success: false,
            message:'something went wrong'
        }
    }
} 