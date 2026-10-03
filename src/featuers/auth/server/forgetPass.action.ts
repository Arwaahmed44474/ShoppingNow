'use server'
import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";


type forgetResponsType = {
    statusMsg: string,
    message: string
}
export async function forgetPassAction(email:string):Promise<forgetResponsType> {
    try {
        let options: AxiosRequestConfig = {
            url: '/auth/forgotPasswords',
            method: 'POST',
            data: {
                email:email
            }
        }
        let { data } = await apiClient.request(options);
        return data;
    } catch (error) {
        throw (error);
    }
}



type veirfyType = {
    status:string
}
export async function verifyResetCode(resetCode:string):Promise<veirfyType> {
    try {
        let options: AxiosRequestConfig = {
            url: '/auth/verifyResetCode',
            method: 'POST',
            data: {
                resetCode:resetCode
            }
        }
        let { data } = await apiClient.request(options);
        return data;
    } catch (error) {
        throw (error);
    }
}


export async function resetPassAction(newPassword:string, email:string) {
    try {
        let options: AxiosRequestConfig = {
            url: '/auth/resetPassword',
            method: 'PUT',
            data: {
                email: email,
                newPassword:newPassword
            }
        }
        let { data } = await apiClient.request(options);
        
        return data;
    } catch (error) {
        throw (error);
    }
}