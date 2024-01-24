import { configureStore, combineReducers } from "@reduxjs/toolkit";
import testReducer from './testSlice';
import productReducer from './testSliceİd';
import cartReducer from './cartSlice';
import sidebarSlice from './sidebarSlice';
import categorieSlice from './categorieSlice';

export const store = configureStore({
  reducer: {
    datas: testReducer,
    product:  productReducer,
    cart: cartReducer,
    sidebar: sidebarSlice,
    categorie: categorieSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch