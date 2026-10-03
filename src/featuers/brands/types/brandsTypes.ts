// 1. Brand Item Interface & Type
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type BrandItem = Brand;

// 2. Pagination Metadata Interface & Type
export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export type MetadataInfo = PaginationMetadata;

// 3. Main API Response Interface & Type
export interface BrandsResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Brand[];
}

export type GetBrandsApiResponse = BrandsResponse;

// ---------- spicific brand 
export interface BrandData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type SingleBrand = BrandData;

// 2. Single Brand API Response Interface
export interface BrandDetailsResponse {
  data: BrandData;
}

export type GetBrandDetailsApiResponse = BrandDetailsResponse;