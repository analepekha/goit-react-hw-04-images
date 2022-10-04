// import axios from 'axios';
import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchData } from '../api/api';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BtnLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';



export class App extends Component {
  state = {
    images: [],
    page: 1,
    per_page: 12,
    loading: false,
    isVisible: false,
    searchQuery: '',
    status: 'idle',
    modalOpen: 'false',
    modalContent: '',
  }
  
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if ((searchQuery && prevState.searchQuery !== searchQuery)
      || prevState.page !== page) {
      this.getImages(searchQuery, page)
    }
    
  }

  async getImages() {
    const { searchQuery, page } = this.state;
    
    this.setState({
      loading: true,
    });

    try {
      this.setState({ status: 'pending' });

      const data = await fetchData(searchQuery, page);
      
      if (data.hits.length === 0) {
         toast.error(
          'Opps... Nothing found, try again'
        );
        this.setState({ status: 'rejected' });
        return;
      }

      if (page === 1) {
        toast.success(`Hooray! We found ${data.totalHits} images.`);
      }
      this.setState({ status: 'resolved' });

      this.setState(({ images }) => {
        return {
          images: [...images, ...data.hits],
          isVisible: page < Math.ceil(data.total / 12),
        };
      });

    } catch (error) {
      console.error(error);
      this.setState({ status: 'rejected' });
    }

    finally {
      this.setState({
      loading: false,
    });
    }
  }
  

  onFormSubmit = (searchQuery) => {
    this.setState({ searchQuery, page:1, images:[]})
  }

  onLoadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      }
    })
  }

  onOpenModal = (e) => {
    const modalContent = e.target.dataset.large;
    this.setState({
      modalOpen: 'true',
      modalContent: modalContent,
    })
  }

  onCloseModal = () => {
    this.setState({
      modalOpen: 'false',
      modalContent: '',
    })
  }

  render() {
    const { images, isVisible , loading, searchQuery, modalOpen, modalContent} = this.state;
    const isImages = Boolean(images.length);

    return (
      <div>
        {modalOpen && (
          <Modal onClose={this.onCloseModal} content={modalContent}>
            <img src={modalContent} alt="" />
        </Modal>)}
        <SearchBar onSubmit={this.onFormSubmit} />
        {loading && <Loader/>}
        {!searchQuery && <div>Please enter the query</div>}
        {isImages && <ImageGallery images={images} onClick={this.onOpenModal} />}
        {isVisible && <BtnLoadMore onClick={this.onLoadMore} />}
        <ToastContainer/>
        </div>
    )
  }
};



 // const { searchQuery, error, status } = this.state;

    // if (status === 'idle') {
    //   return <div>Please enter the query</div>;
    // }

    // if (status === 'penging') {
    //   return <div>Load</div>;
    // }

    // if (status === 'rejected') {
    //   return <h1>{error}</h1>;
    // }

    // if (status === 'resolved') {
    //   return <ImageGallery />;
    // }