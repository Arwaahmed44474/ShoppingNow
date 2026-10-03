

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// --- Main Product Interface ---

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // لو المنتج عليه خصم
  imageCover: string;
  images: string[];
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  createdAt: string;
  updatedAt: string;
}

// --- API Response Wrapper Types ---

export interface PaginationMeta {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface ProductListResponse {
  results: number;
  metadata: PaginationMeta;
  data: Product[];
}