export interface WishlistResponse {
  status: 'success' | 'fail' | 'error';
  message: string;
  data?: string[]; // Array of product IDs
}





// ---------------------get wishlist
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistItem {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
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
  __v: number;
}

export interface GetWishlistResponse {
  status: string;
  count: number;
  data: WishlistItem[];
}


export interface WishlistErrorResponse {
  statusMsg: 'fail' | 'error';
  message: string;
}

// {
//     "statusMsg": "fail",
//     "message": "Expired Token. please login again"
// }