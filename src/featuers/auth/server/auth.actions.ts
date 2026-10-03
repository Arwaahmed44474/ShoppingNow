'use server'

import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers"
import { initialState } from "../slices/auth.slice";

export async function setToken(token: string): Promise<void> {
    const cookiesStore = cookies();
    (await cookiesStore).set('token', token, {
        maxAge: 60 * 60 * 60,
        httpOnly: false
    });
}

export async function getToken():Promise<string | null> {
    const cookiesStore = cookies();
    let token = (await cookiesStore).get('token');

    if (!token) {return null};

    return token.value;
}

export async function deleteToken() :Promise<void>{
    const cookiesStore = cookies();
    (await cookiesStore).delete('token');
}

export async function verifyToken() : Promise<initialState>{
    const cookiesStore = cookies();
    let token = (await cookiesStore).get('token');
    if (!token) {
        return {
            isAuthenticated: false,
            userInfo: null
        };
    }

    try {
        let options:AxiosRequestConfig = {
            url: '/auth/verifyToken',
            method: 'GET',
            headers: {
                token: token.value
            }
        }

        const { data } = await apiClient.request(options);
        
        if (data.message == 'verified') {
            return {
            isAuthenticated: true,
            userInfo: {
                name: data.decoded.name,
                id: data.decoded.id,
                role: data.decoded.role
                }
            };
        }

        return {
            isAuthenticated: false,
            userInfo: null
        };

    } catch (error) {
        return {
            isAuthenticated: false,
            userInfo: null
        };
    }

}