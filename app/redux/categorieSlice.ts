import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from './store';
import axios from 'axios';

interface DataItem {
  id: number;
  title: string;
  src: string;
  category: string;
}

interface DataState {
  data: DataItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCategorieDatas = createAsyncThunk(
  'category/fetchCategorieDatas',
  async ({ product, categorieQuery }: { product: string; categorieQuery: string }) => {
    console.log(categorieQuery)
    try {
      const response = await axios.get<DataItem[]>(`/api/datas?category=${product}&categorieQuery=${categorieQuery}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const categorieSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorieDatas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategorieDatas.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCategorieDatas.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categorieSlice.reducer;

export const selectCategorieİtems = (state: RootStore) => state.categorie.data;