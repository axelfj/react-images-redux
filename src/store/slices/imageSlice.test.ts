import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store'; // Assuming you have a store setup
import imageReducer, {
  fetchImages,
  selectImage,
  clearSelection,
  addImage,
  ImageState,
} from './imageSlice';

// Mocking the fetchImages async thunk
jest.mock('./imageSlice', () => ({
  __esModule: true,
  ...jest.requireActual('./imageSlice'),
  fetchImages: jest.fn(),
}));

describe('imageSlice', () => {
  let initialState: ImageState;
  let dispatch: ThunkDispatch<RootState, undefined, AnyAction>;

  beforeEach(() => {
    initialState = {
      images: [],
      loading: false,
      error: null,
      selectedImage: null,
    };
    dispatch = jest.fn();
  });

  it('should handle initial state', () => {
    const nextState = imageReducer(undefined, {} as AnyAction);
    expect(nextState).toEqual(initialState);
  });

  it('should handle selectImage', () => {
    const selectedImage = { id: '1', author: 'Author', download_url: 'url' };
    const nextState = imageReducer(initialState, selectImage(selectedImage));
    expect(nextState.selectedImage).toEqual(selectedImage);
  });

  it('should handle clearSelection', () => {
    const stateWithSelectedImage = {
      ...initialState,
      selectedImage: { id: '1', author: 'Author', download_url: 'url' },
    };
    const nextState = imageReducer(stateWithSelectedImage, clearSelection());
    expect(nextState.selectedImage).toBeNull();
  });

  it('should handle addImage', () => {
    const newImage = { id: '1', author: 'Author', download_url: 'url' };
    const nextState = imageReducer(initialState, addImage(newImage));
    expect(nextState.images).toContainEqual(newImage);
  });

  // it('should handle fetchImages pending', () => {
  //   // const nextState = imageReducer(initialState, fetchImages.pending());
  //   expect(nextState.loading).toBeTruthy();
  //   expect(nextState.error).toBeNull();
  // });

  it('should handle fetchImages fulfilled', () => {
    const images = [{ id: '1', author: 'Author', download_url: 'url' }];
    const nextState = imageReducer(
      initialState,
      fetchImages.fulfilled(images, '')
    );
    expect(nextState.loading).toBeFalsy();
    expect(nextState.images).toEqual(images);
  });

  it('should handle fetchImages rejected', () => {
    const error = 'Failed to fetch images';
    const nextState = imageReducer(
      initialState,
      fetchImages.rejected(new Error(error), '')
    );
    expect(nextState.loading).toBeFalsy();
    expect(nextState.error).toEqual(error);
  });
});
