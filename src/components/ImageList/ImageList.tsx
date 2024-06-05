import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
  fetchImages,
  selectImage,
  addImage,
} from '../../store/slices/imageSlice';
import ImageItem from '../ImageItem/ImageItem';
import styled from 'styled-components';

const ImageListContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
`;

const ImageList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error } = useSelector(
    (state: RootState) => state.images
  );

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const newImage = {
            id: new Date().toISOString(),
            author: 'Local Upload',
            download_url: reader.result as string,
          };
          dispatch(addImage(newImage));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <ImageListContainer>
      <FileInput type="file" onChange={handleImageUpload} />
      {loading && <p> loading... </p>}
      {error && <p>{error}</p>}
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          onClick={() => dispatch(selectImage(image))}
        />
      ))}
    </ImageListContainer>
  );
};

export default ImageList;
