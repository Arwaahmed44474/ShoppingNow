import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductDetails } from "../types/proDetailsType";

export async function getProductDetails(id: string) :Promise<ProductDetails>{
    const options: AxiosRequestConfig = {
        url: `/products/${id}`,
        method: 'GET'
    };

    let { data } = await apiClient.request(options);

    return data.data;
}