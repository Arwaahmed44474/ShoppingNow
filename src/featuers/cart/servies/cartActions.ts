'use server'

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"
import { AddToCartResponse, ApiErrorResponse } from "../types/cartType";

export async function getCartItems():Promise<AddToCartResponse | ApiErrorResponse> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');

    console.log(token)
    if (!token) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }

    try {
        let options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v2/cart',
            method: 'GET',
            headers: {
                token: token?.value
            }
        };

        let { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.log(error);
        return {
            status: 'fail',
            message:'Something went wrong, try again'
        }
    }

}

export async function addProductToCart(id:string):Promise<AddToCartResponse | ApiErrorResponse> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');

    console.log(token)
    if (!token) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }

    try {
        let options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v2/cart',
            method: 'POST',
            headers: {
                token: token.value,
            },
            data: {
                productId: id
            }
        };

        let {data} = await axios.request(options);
        return data;
    } catch (error) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }
    
}

export async function removeProductfromCart(id:string):Promise<AddToCartResponse | ApiErrorResponse> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');

    console.log(token)
    if (!token) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
            method: 'DELETE',
            headers: {
                token: token.value,
            },

        };

        let {data} = await axios.request(options);
        return data;
    } catch (error) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }
    
}

export async function clearCart():Promise<AddToCartResponse | ApiErrorResponse> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');

    console.log(token)
    if (!token) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v2/cart`,
            method: 'DELETE',
            headers: {
                token: token.value,
            },

        };

        let {data} = await axios.request(options);
        return data;
    } catch (error) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }
    
}

export async function updateProCount(id:string, count:number):Promise <AddToCartResponse | ApiErrorResponse> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token');

    console.log(token)
    if (!token) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
            method: 'PUT',
            headers: {
                token: token.value,
            },
            data: {
                'count': count
            }
        };

        let {data} = await axios.request(options);
        return data;
    } catch (error) {
        return {
            status: 'fail',
            message:'You are not login'
        }
    }
    
}