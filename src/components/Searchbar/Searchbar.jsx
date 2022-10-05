import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
    HeaderSearch,
    FormSearch,
    ButtonSearch,
    LabelSearch,
    InputSearch
} from './Searchbar.styled';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export class SearchBar extends Component {
  state = {
    searchQuery: '',
  }

  handleChange = e => {
    this.setState({searchQuery:e.currentTarget.value.toLowerCase()})
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('Opps...Try again!');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  }

  render() {
    const { searchQuery } = this.state;
    const { handleSubmit, handleChange } = this;
    
    return (
        <HeaderSearch>
          <FormSearch onSubmit={handleSubmit}>
            <ButtonSearch type="submit">
              <BsSearch/>
              <LabelSearch>Search</LabelSearch>
            </ButtonSearch>

            <InputSearch
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handleChange}
              value={searchQuery}
            />
          </FormSearch>
        </HeaderSearch>
    )
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
}