'use server'

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"
import { OrdersResponse } from "../type/ordersType";

export async function getUserOrders({id} : {id:string}) :Promise<OrdersResponse>{
    const cookiesMehodes = cookies();
    const token = (await cookiesMehodes).get('token')?.value;

    if (!token) {
        throw new Error('You need to login ')
    }
    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/6ab542154da3e600125205c7`,
            method:'GET'
        };
        let { data } = await axios.request(options);
        return data;

    } catch (error) {
        throw error;
        
    }
}