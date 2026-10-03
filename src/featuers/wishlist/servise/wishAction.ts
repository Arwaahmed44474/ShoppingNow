'use server'
import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from "next/headers";
import { GetWishlistResponse, WishlistErrorResponse, WishlistResponse } from '../types/type';

async function tokenCheck():Promise<string | null> {
    const cookiesMeth = cookies();
    const token = (await cookiesMeth).get('token')?.value || null;
    if (!token) {
        throw new Error('You need to login');
    }
    return token;
}


export async function getWishList():Promise<GetWishlistResponse | WishlistErrorResponse>{
    const token = await tokenCheck();

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
            method: 'GET',
            headers: {
                token: token
            }
        };

        let {data}  = await axios.request(options);
        return data;

    } catch (error) {
        throw(error);
    }
}

export async function addToWishList(productId: string):Promise<WishlistResponse >{
    const token = await tokenCheck();

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
            method: 'POST',
            headers: {
                token: token
            },
            data: {
                productId: productId
            }
        };

        let {data}  = await axios.request(options);

        return data;

    } catch (error) {
        throw(error);
    }
}

export async function removeFromWishList(productId: string):Promise<WishlistResponse >{
    const token = await tokenCheck();

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method: 'DELETE',
            headers: {
                token: token
            },

        };

        let {data}  = await axios.request(options);

        return data;

    } catch (error) {
        throw(error);
    }
}