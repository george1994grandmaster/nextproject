import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';

interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number,
}

interface DataState {
  products: DataItem[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  cart: DataItem[],
  productQuantity: DataItem[],
}

const initialState: DataState = {
  products: [] || null, 
  status: 'idle',
  error: null,
  cart: [],
  productQuantity: []
};

export const fetchProductByİd = createAsyncThunk(
  'data/fetchProductByİd',
  async ({ product, productİd }: { product: string; productİd: string }) => {
    try {
      const response = await axios.get<DataItem>(`/api/datas?category=${product}&productİd=${productİd}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const dataSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productToUpdate = state.products.find((item) => item.id === productId);
      if (productToUpdate) {
        state.products = state.products.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByİd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByİd.fulfilled, (state, action: PayloadAction<DataItem>) => {
        state.status = 'succeeded';
        const currentProduct = { ...action.payload }; 
        const existingProduct = state.products.find(item => item.id === currentProduct.id);
        if (!existingProduct) {
          state.products = [...state.products, { ...currentProduct, quantity: 1 }];
        }
        state.error = null;
      })
      .addCase(fetchProductByİd.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;
export const { addToCart} = dataSlice .actions;
export const selectLoading = (state: RootStore) => state.product.status;
export const selectProductByİd = (state: RootStore) => state.product.products;