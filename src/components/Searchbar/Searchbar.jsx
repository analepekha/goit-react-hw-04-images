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
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';



export const SearchBar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => setSearchQuery(e.currentTarget.value.toLowerCase());  

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('Opps...Try again!');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  }
  
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

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
}