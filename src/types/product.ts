export interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  quantity: number;
  image_url: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}