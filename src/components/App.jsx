import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchData } from '../api/api';
import { ToastContainer, toast} from 'react-toastify';
import { BtnLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Wraper, Text } from 'components/App.styled';
import { useState } from 'react';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
  
      try {
        setStatus(Status.PENDING);
        const data = await fetchData(searchQuery, page);

        setStatus(Status.RESOLVED);
        setImages(prevImages => {
          return [...prevImages, ...data.hits]
        })
        if (data.hits.length>0 && page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
        if(data.hits.length === 0){
          toast.error(
            'Opps... Nothing found, try again'
          );
          setStatus(Status.REJECTED);
          return;
        }
        setIsVisible(page < Math.ceil(data.total / 12));

      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }

      finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      getImages();
    }
  }, [searchQuery, page]);


  const onFormSubmit = (searchQuery) => {
    // if (searchQuery === this.state.searchQuery) {
    //   toast.error('Oops... Something went wrong, repeat your query!')
    // }
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  }

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }

  const openModal = (largeImage) => {
    setModalOpen(true);
    setLargeImage(largeImage);
  }

  const closeModal = () => {
    setModalOpen(false);
    setLargeImage('');
  };
  
  const isImages = Boolean(images.length);

    return (
      <>
        <SearchBar onSubmit={onFormSubmit} />
        <Wraper>
          {status === Status.PENDING && loading && <Loader />}
          {status === Status.REJECTED && error && <Text>Oops, something went wrong... Reload the page</Text>}
          {!searchQuery && <Text>Please, enter the query :)</Text>}
          {isImages && <ImageGallery images={images} onClick={openModal} />}
          {isVisible && isImages && <BtnLoadMore onClick={onLoadMore} />}
          {modalOpen && (
          <Modal onClose={closeModal} largeImage={largeImage}>
          </Modal>
        )}
        </Wraper>
        <ToastContainer autoClose={2000}/>
      </>
    )
};

