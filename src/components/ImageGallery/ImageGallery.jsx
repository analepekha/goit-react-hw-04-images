import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';


export const ImageGallery = ({ images }) => {

    return (
        <GalleryList > 
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return <ImageGalleryItem
                    key={id}
                    smallImage={webformatURL}
                    largeImage={largeImageURL}
                    description={tags}
                />
            })}
        </GalleryList>
    )
}

ImageGallery.propTypes = {
    images:PropTypes.arrayOf(PropTypes.object).isRequired,
}