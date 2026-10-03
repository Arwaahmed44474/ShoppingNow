// Subcategory Interface
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category Interface
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand Interface
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product Details Interface
export interface ProductDetails {
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
  subcategory: Subcategory[];
}

// Item inside the cart products array
export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: ProductDetails;
}

// Cart Data Object Interface
export interface CartData {
  _id?: string;
  cartOwner?: string;
  products: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}

// Main API Response Interface
export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

// Alternative Type export if you prefer Types
// export type AddToCartResponsePayload = AddToCartResponse;

export interface ApiErrorResponse {
  status: 'fail' | 'error';
  message: string;
}

// export type CartResponse = AddToCartResponse | ApiErrorResponse;