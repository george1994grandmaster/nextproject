import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';


interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: string;
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
  async ({ product, productİd }: { product: string; productİd: number }) => {
    try {
      const response = await axios.get<DataItem>(`/api/datas?category=${product}&productİd=${productİd}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

export const fetchProductByLetter = createAsyncThunk(
  'letter/fetchProductByLetter',
  async ({ product, productQuery }: { product: string; productQuery: string }) => {
    try {
      const response = await axios.get<DataItem[]>(`/api/datas?category=${product}&productQuery=${productQuery}`);
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
    decreaseFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productToUpdate = state.products.find((item) => item.id === productId);
      if (productToUpdate) {
        state.products = state.products.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    },
    addToBasket: (state, action: PayloadAction<DataItem>) => {
      const currentProduct = { ...action.payload };
      const formattedPrice = parseFloat(currentProduct.price.replace(/[^0-9,.]+/g, '').replace(',', '.'));
      
      const cartFromLocalStorageString = localStorage.getItem('cart');
      const cartFromLocalStorage = cartFromLocalStorageString ? JSON.parse(cartFromLocalStorageString) as DataItem[] : [];
      const existingProduct = cartFromLocalStorage.find((item: DataItem) => item.id === currentProduct.id);
    
      if (!existingProduct) {
        const updatedPrice = formattedPrice * currentProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        currentProduct.price = updatedPriceStringWithComma
        localStorage.setItem('cart', JSON.stringify([...cartFromLocalStorage, currentProduct]));
      }else {
        existingProduct.quantity += currentProduct.quantity;
        const updatedPrice = formattedPrice * existingProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        existingProduct.price = updatedPriceStringWithComma;
        localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
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
      })
      .addCase(fetchProductByLetter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByLetter.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.status = 'succeeded';
        state.products = action.payload
      })
    },
});

export default dataSlice.reducer;
export const { addToCart, decreaseFromCart, addToBasket } = dataSlice.actions;
export const selectLoading = (state: RootStore) => state.product.status;
export const selectProductByİd = (state: RootStore) => state.product.products;
export const selectProductCart = (state: RootStore) => state.product.cart;
