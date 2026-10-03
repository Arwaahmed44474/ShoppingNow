'use server'

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"
import { shippingaddresstype } from "../sheama/cheakoutSchema";


export async function cashCheakout({cartId, shippingAddress}:{cartId:string, shippingAddress: shippingaddresstype}) {
    let cookiessMethodes = cookies();
    let token = (await cookiessMethodes).get('token')?.value;

    if (!token) {
        throw new Error('You need to login');
    }
    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
            method: 'POST',
            headers: {
                token: token
            },
            data: {shippingAddress}
            
        };
        let { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export async function onlineCheakout({cartId, shippingAddress,url}:{cartId:string, shippingAddress: shippingaddresstype,url:string}) {
    let cookiessMethodes = cookies();
    let token = (await cookiessMethodes).get('token')?.value;

    if (!token) {
        throw new Error('You need to login');
    }
    try {
        const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${origin}`,
            method: 'POST',
            headers: {
                token: token
            },
            data: shippingAddress
            
        };
        let { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw new Error('You need to login');
    }
}