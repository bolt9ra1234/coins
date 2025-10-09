import { createSlice } from '@reduxjs/toolkit';

// Теперь корзина управляется через API, но оставляем слайс для локального состояния UI
interface CartUIState {
  isOpen: boolean;
}

const initialState: CartUIState = {
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cartUI',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openCart, closeCart, toggleCart } = cartSlice.actions;