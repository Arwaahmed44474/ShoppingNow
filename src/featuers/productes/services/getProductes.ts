import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductListResponse } from "../types/Protypex";

export async function getProducties(): Promise<ProductListResponse> {
    let options: AxiosRequestConfig = {
        url: '/products',
        method: 'GET'
    };

    let { data } = await apiClient.request(options);

    return data;
}