import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
    }));
  };

  render() {
    const { smallImage, largeImage, description } = this.props;
    const { modalOpen } = this.state;
    const { toggleModal } = this;
    return (
      <>
        <GalleryItem onClick={toggleModal}>
          <GalleryItemImg src={smallImage} alt={description} loading="lazy" />
        </GalleryItem>
        {modalOpen && (
          <Modal onClose={toggleModal}>
            <img src={largeImage} alt={description} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}


// export const ImageGalleryItem = ({ smallImage, largeImage, description, onClick }) => {
//     return (
//         <GalleryItem  onClick={onClick}>
//           <GalleryItemImg src={smallImage} alt={description} data-large={largeImage} loading="lazy" />
//         </GalleryItem>
//     )
// }
