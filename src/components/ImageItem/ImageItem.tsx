import React from 'react';

import { Image } from '../../store/slices/imageSlice';
import styled from 'styled-components';

interface ImageItem {
  image: Image;
  onClick: () => void;
}

const ImageItemContainer = styled.div`
  cursor: pointer;
  padding: 10px;
`;
const ImageElement = styled.img`
  width: 100%;
  height: auto;
`;

const ImageItem: React.FC<ImageItem> = ({ image, onClick }) => {
  return (
    <ImageItemContainer onClick={onClick}>
      <ImageElement src={image.download_url} alt={image.author} />
    </ImageItemContainer>
  );
};

export default ImageItem;
