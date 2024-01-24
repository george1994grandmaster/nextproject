import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootStore } from './store';

interface productsCount {
  totalCount: number | null
}

interface CartItem {
  quantity: number;
}

const initialState: productsCount = {
  totalCount: null
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    displayTotalCount: (state) => {
      const cartFromLocalStorageString = localStorage.getItem('cart');
      const cart = cartFromLocalStorageString ? JSON.parse(cartFromLocalStorageString) : null;
      state.totalCount = cart ? cart.reduce((total: number, item: CartItem) => total + item.quantity, 0) : 0;
    },
  },
});

export default cartSlice.reducer;
export const { displayTotalCount } = cartSlice.actions;
export const selectCart = (state: RootStore) => state.cart.totalCount;