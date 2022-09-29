// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
    HeaderSearch,
    FormSearch,
    ButtonSearch,
    LabelSearch,
    InputSearch
} from './Searchbar.styled';

export const SearchBar =() => {
    return (
        <HeaderSearch>
  <FormSearch >
    <ButtonSearch type="submit">
      <LabelSearch>Search</LabelSearch>
    </ButtonSearch>

    <InputSearch
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </FormSearch>
</HeaderSearch>
    )
}