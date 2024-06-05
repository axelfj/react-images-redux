import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { clearSelection } from '../../store/slices/imageSlice';
import styled from 'styled-components';

const ImageViewerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 80%;
`;
const ImageElement = styled.img`
  max-width: 80%;
  max-height: 80%;
`;
const ClearButton = styled.button`
  margin-top: 10px;
`;

const ImageViewer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedImage = useSelector(
    (state: RootState) => state.images.selectedImage
  );

  return (
    <ImageViewerContainer>
      {selectedImage ? (
        <>
          <ImageElement
            src={selectedImage.download_url}
            alt={selectedImage.author}
          />
          <ClearButton onClick={() => dispatch(clearSelection())}>
            Clear
          </ClearButton>
        </>
      ) : (
        <p>No image selected.</p>
      )}
    </ImageViewerContainer>
  );
};

export default ImageViewer;
