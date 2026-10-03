import { SingleBrand } from '@/featuers/brands/types/brandsTypes';
import { CategoriesResponse } from './../types/catTypes';
import { apiClient } from "@/services/apiClient";

import axios, { AxiosRequestConfig } from "axios";


export async function getAllCat(): Promise<CategoriesResponse> {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url:'/categories'
        }

        let { data } = await apiClient.request(options);
        return data;
    } catch (error) {
        throw (error);
    }
}

export async function getSpicificCat(catID:string): Promise<{data: SingleBrand}> {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `https://ecommerce.routemisr.com/api/v1/categories/${catID}`
        }

        let { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw(error)
    }
}