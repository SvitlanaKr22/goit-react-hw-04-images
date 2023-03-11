import PropTypes from 'prop-types';
import { Item, ImageItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ urlImage, largeImage, alt, onClick, onOpen }) => {
  return (
    <Item>
      <ImageItem
        src={urlImage}
        alt={alt}
        onClick={() => {
          onClick(largeImage);
          onOpen();
        }}
      />
    </Item>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  urlImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
