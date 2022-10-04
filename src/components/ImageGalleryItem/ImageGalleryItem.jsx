import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
    return (
        <GalleryItem >
          <GalleryItemImg src={smallImage} alt={tags} data-large={largeImage} />
        </GalleryItem>
    )
}