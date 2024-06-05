import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import ImageList from './components/ImageList/ImageList';
import ImageViewer from './components/ImageViewer/ImageViewer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  color: white;
`;

function App() {
  return (
    <Provider store={store}>
      <Container>
        <ImageList />
        <ImageViewer />
      </Container>
    </Provider>
  );
}

export default App;
