import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchData } from '../api/api';
import { ToastContainer, toast} from 'react-toastify';
import { BtnLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { Wraper, Text} from 'App.styled';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    per_page: 12,
    loading: false,
    isVisible: false,
    searchQuery: '',
    status: 'idle',
  }
  
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if ((searchQuery && prevState.searchQuery !== searchQuery)
      || prevState.page !== page) {
      this.getImages(searchQuery, page)
      this.setState({
        isVisible: false,
      })
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

  render() {
    const { images, isVisible , loading, searchQuery} = this.state;
    const isImages = Boolean(images.length);

    return (
      <>
        <SearchBar onSubmit={this.onFormSubmit} />
        <Wraper>
          {loading && <Loader/>}
          {!searchQuery && <Text>Please, enter the query :)</Text>}
          {isImages && <ImageGallery images={images} />}
          {isVisible && isImages && <BtnLoadMore onClick={this.onLoadMore} />}
        </Wraper>
        <ToastContainer autoClose={2000}/>
      </>
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

     // onOpenModal = (e) => {
  //   const modalContent = e.target.dataset.large;
  //   this.setState({
  //     modalOpen: 'true',
  //     modalContent,
  //   })
  // }

  // closeModal = () => {
  //   this.setState({
  //     modalOpen: 'false',
  //     modalContent: '',
  //   })
  // }