import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';

const store = configureStore({
  reducer: {
    images: imageReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;