// Interface الخاص بكل تصنيف فردي (Category)
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Interface الخاص ببيانات التصفح (Pagination Metadata)
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

// Interface الرئيسي للـ API Response
export interface CategoriesResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}