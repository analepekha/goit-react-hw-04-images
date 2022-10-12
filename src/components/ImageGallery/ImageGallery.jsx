import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';


export const ImageGallery = ({ onClick, images }) => {

    return (
        <GalleryList > 
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return <ImageGalleryItem
                    key={id}
                    smallImage={webformatURL}
                    largeImage={largeImageURL}
                    description={tags}
                    onClick={onClick}
                />
            })}
        </GalleryList>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick:PropTypes.func.isRequired,
    
}