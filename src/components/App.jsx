import axios from 'axios';
import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import fetchData from '../api/api';

const API_KEY = '30250701-58f241540210259817e57fd57';
const BASE_URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    items: '',
    page: 1,
    per_page: 12,
    loading: false,
    searchQuery: '',
  }

  searchParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
  })
  
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { page, per_page, searchQuery } = this.state;
    
    const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&${this.searchParams}&page=${page}&per_page=${per_page}`
    try {
      const response = axios.get(url);
      console.log(response.data);
      
      this.setState({
      loading: true,
      items: response.data.hits
    });
    } catch (error) {
      console.log(error.message);
      return;
    }

    
  }

//  onSubmit = e => {
//     e.preventDefault();
//     console.log(e);
//  }
  
  render() {
    return (
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
        <SearchBar />
        <ImageGallery/>
        </div>
    )
  }
};
