import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  onClick,
  smallImage,
  largeImage,
  description,
}) => {
  return (
    <GalleryItem onClick={() => { onClick(largeImage) }}>
      <GalleryItemImg src={smallImage} alt={description}  loading="lazy" />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
