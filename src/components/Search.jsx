import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Search = ({ searchBooks, aggs }) => {
    const [search, setSearch] = useState('');
    console.log("Category Aggregation", aggs['Category Aggregation'])
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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Busqueda Avanzada</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="ISBN" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="Author" />
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <Button variant="outline-secondary" id="button-addon1">
                            Button
                            </Button>
                            <Button variant="outline-secondary" id="button-addon1">
                            Button
                            </Button>
                            <Button variant="outline-secondary" id="button-addon1">
                            Button
                            </Button>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Button variant="outline-secondary" id="button-addon1">
                            Button
                            </Button>
                            <Button variant="outline-secondary" id="button-addon1">
                            Button
                            </Button>
                            <Button variant="outline-secondary" id="button-addon1">
                            Button
                            </Button>
                        </InputGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
  }
  
  export default Search;