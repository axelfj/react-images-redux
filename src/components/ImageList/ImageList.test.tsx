import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ImageList from './ImageList';

const mockStore = configureStore([thunk]);

describe('ImageList', () => {
  it('renders loading state', () => {
    const store = mockStore({
      images: {
        images: [],
        loading: true,
        error: null,
        selectedImage: null,
      },
    });

    render(
      <Provider store={store}>
        <ImageList />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBe(true);
  });

  it('renders error state', () => {
    const store = mockStore({
      images: {
        images: [],
        loading: false,
        error: 'Failed to fetch images',
        selectedImage: null,
      },
    });

    render(
      <Provider store={store}>
        <ImageList />
      </Provider>
    );

    expect(screen.getByText(/error: failed to fetch images/i)).toBe(null);
  });

  it('renders images', () => {
    const store = mockStore({
      images: {
        images: [{ id: '1', author: 'Author 1', download_url: 'url1' }],
        loading: false,
        error: null,
        selectedImage: null,
      },
    });

    render(
      <Provider store={store}>
        <ImageList />
      </Provider>
    );

    expect(screen.getByAltText(/author 1/i)).toBe(true);
  });

  it('uploads an image', () => {
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
        <ImageList />
      </Provider>
    );

    const fileInput = screen.getByLabelText(/file/i);
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const actions = store.getActions();
    expect(actions[0].type).toBe('images/addImage');
  });
});
