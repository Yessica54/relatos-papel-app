import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = ({ searchBooks }) => {
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        searchBooks(search);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <Form.Control
                    size="lg"
                    placeholder="Buscar por Titulo"
                    aria-label="Buscar por Titulo"
                    aria-describedby="basic-addon2"
                    data-bs-theme="dark"
                    value={search} onInput={e => setSearch(e.target.value)}
                />
                <Button  data-bs-theme="dark" variant="outline-secondary" id="button-addon2" type="submit">
                    Buscar
                </Button>
            </InputGroup>
        </Form>
    );
  }
  
  export default Search;