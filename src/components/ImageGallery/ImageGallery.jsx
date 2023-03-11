import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import ImageGalleryItem from './../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, name, onClick, onOpen }) => (
  <List>
    {images.map(({ id, largeImageURL, webformatURL }) => (
      <ImageGalleryItem
        key={id}
        urlImage={webformatURL}
        alt={`photo ${name}`}
        onClick={onClick}
        onOpen={onOpen}
        largeImage={largeImageURL}
      />
    ))}
  </List>
);

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
