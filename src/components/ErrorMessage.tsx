import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Alert data-testid="error-message" variant="danger">
      {message}
    </Alert>
  );
};

export default ErrorMessage;
