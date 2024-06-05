import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Image {
  id: string;
  author: string;
  download_url: string;
}

export interface ImageState {
  images: Image[];
  loading: boolean;
  error: string | null;
  selectedImage: Image | null;
}

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
  selectedImage: null,
};

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const response = await fetch('https://picsum.photos/v2/list');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return (await response.json()) as Image[];
});

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    selectImage: (state, action: PayloadAction<Image | null>) => {
      state.selectedImage = action.payload;
    },
    clearSelection: (state) => {
      state.selectedImage = null;
    },
    addImage: (state, action: PayloadAction<Image>) => {
      state.images.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch images';
      });
  },
});

export const { selectImage, clearSelection, addImage } = imageSlice.actions;
export default imageSlice.reducer;
