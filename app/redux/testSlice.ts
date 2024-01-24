import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootStore } from './store';

interface DataItem {
  id: number;
  title: string;
  src: string;
  category: string;
  price: string;
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


export const fetchDatas = createAsyncThunk('data/fetchData', async ({ product, dataCount }: { product: string; dataCount?: number }) => {
  try {
    const response = await axios.get<DataItem[]>(`/api/datas?category=${product}${dataCount ? `&dataCount=${dataCount}` : ''}`);
    return response.data;
  } catch (error) {
    return Promise.reject(new Error('Failed to fetch products'));
  }
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDatas.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        
        state.error = null;
      })
      .addCase(fetchDatas.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;

export const selectLoading = (state: RootStore) => state.datas.status;
export const selectAllProducts = (state: RootStore) => state.datas.data;