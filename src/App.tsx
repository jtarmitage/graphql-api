import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <SearchInput onChange={handleSearchChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DisplayRepositories query={searchValue} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
