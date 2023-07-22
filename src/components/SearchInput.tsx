import React, { ChangeEvent } from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form>
      <FormControl type="text" placeholder="Search" onChange={handleInputChange} />
    </Form>
  );
};

export default SearchInput;
