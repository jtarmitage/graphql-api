import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import { DisplayRepositories } from './components/DisplayRepositories';

const App = () => {
  const [searchValue, setSearchValue] = useState('topic:react');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <Container>
        <Header />
        <SearchInput onChange={handleSearchChange} />
        <DisplayRepositories query={searchValue} />
      </Container>
    </>
  );
};

export default App;
