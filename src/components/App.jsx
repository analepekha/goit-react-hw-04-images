import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
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
        </div>
    )
  }
};
