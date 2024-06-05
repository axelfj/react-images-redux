import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ImageViewer from './ImageViewer';
import { clearSelection } from '../../store/slices/imageSlice';

const mockStore = configureStore([]);

describe('ImageViewer', () => {
  it('renders no image selected message', () => {
    const store = mockStore({
      images: {
        images: [],
        loading: false,
        error: null,
        selectedImage: null,
      },
    });

    render(
      <Provider store={store}>
        <ImageViewer />
      </Provider>
    );

    expect(screen.getByText(/no image selected/i)).toBe(null);
  });

  it('renders selected image', () => {
    const store = mockStore({
      images: {
        images: [],
        loading: false,
        error: null,
        selectedImage: { id: '1', author: 'Author 1', download_url: 'url1' },
      },
    });

    render(
      <Provider store={store}>
        <ImageViewer />
      </Provider>
    );

    expect(screen.getByAltText(/author 1/i)).toBe(true);
  });

  it('clears selected image', () => {
    const store = mockStore({
      images: {
        images: [],
        loading: false,
        error: null,
        selectedImage: { id: '1', author: 'Author 1', download_url: 'url1' },
      },
    });

    render(
      <Provider store={store}>
        <ImageViewer />
      </Provider>
    );

    fireEvent.click(screen.getByText(/clear/i));

    const actions = store.getActions();
    expect(actions[0]).toEqual(clearSelection());
  });
});
