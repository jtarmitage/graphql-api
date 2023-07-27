import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner data-testid="loading-component" animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loading;
