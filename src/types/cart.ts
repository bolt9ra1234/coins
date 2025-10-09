export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  price: number;
  total_price: number;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total: number;
}

export interface AddToCartRequest {
  product_id: number;
  quantity?: number;
}