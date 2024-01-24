import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from './store';
import axios from 'axios';

interface DataItem {
  id: number;
  title: string;
  category: string
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

export const fetchSidebarDatas = createAsyncThunk(
  'sidebar/fetchSidebarDatas',
  async ({ sidebarİtems }: { sidebarİtems: string }) => {
    try {
      const response = await axios.get<DataItem[]>(`/api/datas?category=${sidebarİtems}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarDatas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSidebarDatas.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchSidebarDatas.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default sidebarSlice.reducer;

export const selectSidebarDatas = (state: RootStore) => state.sidebar.data;