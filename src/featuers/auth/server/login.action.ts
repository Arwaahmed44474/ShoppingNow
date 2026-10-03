
'use server'
import { apiClient } from "@/services/apiClient";
import { loginSchema, loginValuesType } from "../schemas/loginSchema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import {z } from "zod";


type filedErrorType = Partial<Record<keyof loginValuesType, string[]>>; 

type loginResponseType = {
          message: string,
          user: { name: string, email: string, role: string },
          token: string
        }

type loginactionReturn = {success:true, message:string, data: loginResponseType} | {success:false, message:string, fieldErrors?:filedErrorType}



export async function loginAction(values: loginValuesType): Promise<loginactionReturn> {
    
    let secondValidation = loginSchema.safeParse(values);
    console.log(secondValidation);
    
    if (secondValidation.success == false) {
        let { formErrors, fieldErrors } = z.flattenError(secondValidation.error);
        return {
            success: false,
            message: formErrors[0] ?? 'fix highlited errors',
            fieldErrors
        };
    }

    try {
        let options: AxiosRequestConfig = {
            url: '/auth/signin',
            method: 'POST',
            data:secondValidation.data
        }
        let { data} = await apiClient.request(options);

        console.log('server data', data);
        //         {
        //   message: 'success',
        //   user: { name: 'arwa', email: 'arwa987@gmail.com', role: 'user' },
        //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYjU0MjE1NGRhM2U2MDAxMjUyMDVjNyIsIm5hbWUiOiJhcndhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3OTAyNjM5ODEsImV4cCI6MTc5ODAzOTk4MX0.SqqBxYGnJJFU8uwDMQ6ZophnTlYYdE-nt_9_yNL1hk4'
        // }

        return {
            success: true,
            message: 'User login succesfuly',
            data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data.message ?? 'Can not reach the server',
            };
        }
        return { success: false, message: 'Something went wrong', };
    }
} 
 