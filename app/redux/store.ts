import { configureStore, combineReducers } from "@reduxjs/toolkit";
import testReducer from './testSlice';
import productReducer from './testSliceİd';

export const store = configureStore({
  reducer: {
    datas: testReducer,
    product:  productReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch