import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Category } from '../types/product';
import { Cart, AddToCartRequest } from '../types/cart';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.digital-store.dev.routeam.ru/',
    prepareHeaders: (headers) => {
      // Добавляем заголовок X-Telegram-User-Id для всех запросов
      // В реальном приложении это будет браться из Telegram WebApp API
      headers.set('X-Telegram-User-Id', '123456789');
      return headers;
    },
  }),
  tagTypes: ['Cart'],
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
    getCart: builder.query<Cart, void>({
      query: () => 'cart/',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<void, AddToCartRequest>({
      query: (body) => ({
        url: 'cart/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    increaseCartItem: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `cart/${itemId}/increase`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Cart'],
    }),
    decreaseCartItem: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `cart/${itemId}/decrease`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `cart/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useIncreaseCartItemMutation,
  useDecreaseCartItemMutation,
  useRemoveFromCartMutation,
} = apiSlice;