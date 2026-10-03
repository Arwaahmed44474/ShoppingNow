// --- Review Sub-interface ---

import { Product } from "./Protypex";

export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review?: string;
  rating: number;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// --- Extended Product Details Interface ---

export interface ProductDetails extends Product {
  __v?: number;
  reviews: Review[];
}