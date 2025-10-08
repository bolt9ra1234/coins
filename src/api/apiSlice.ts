import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Category } from '../types/product';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://digital-store.dev.routeam.ru/',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    getProducts: builder.query<Product[], number | undefined>({
      query: (categoryId) => ({
        url: 'products',
        params: categoryId ? { category_id: categoryId } : {},
      }),
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = apiSlice;