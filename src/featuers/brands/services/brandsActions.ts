'use server'
import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { BrandsResponse, GetBrandDetailsApiResponse, GetBrandsApiResponse } from '../types/brandsTypes';


export async function getBrands():Promise<GetBrandsApiResponse> {

    try {
        let options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/brands',
            method: 'GET'
        };
        let { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw (error);
    }
}

export async function getspecificBrands(brandId:string):Promise<GetBrandDetailsApiResponse> {

    try {
        let options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
            method: 'GET'
        };
        let { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw (error);
    }
}