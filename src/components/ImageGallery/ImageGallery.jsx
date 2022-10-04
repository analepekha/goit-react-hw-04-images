import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick}) => {
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