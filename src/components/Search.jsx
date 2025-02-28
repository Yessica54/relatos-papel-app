import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Search = ({ searchBooks, aggs }) => {
    const [search, setSearch] = useState('');
    const [ISBN, setISBN] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([]);

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCategories((prev) => [...prev, value]);
        } else {
            setSelectedCategories((prev) => prev.filter((val) => val !== value));
        }
    };

    const handlePriceChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedPrice((prev) => [...prev, value]);
        } else {
            setSelectedPrice((prev) => prev.filter((val) => val !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchBooks(search,ISBN, author, selectedCategories, selectedPrice);
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
                <Button data-bs-theme="dark" variant="outline-secondary" id="button-addon2" type="submit">
                    Buscar
                </Button>
            </InputGroup>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Busqueda Avanzada</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="ISBN" value={ISBN} onInput={e => setISBN(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="Author" value={author} onInput={e => setAuthor(e.target.value)}/>
                        </Form.Group>
                        <hr />
                        <h5 className='text-start'>Categorias</h5>
                        <hr />
                        <div key={`inline-checkbox-category`} className="mb-3 text-start">
                            {aggs['Category Aggregation']?.map((category) => (
                                <Form.Check
                                    inline
                                    label={`${category.key} (${category.count})`}
                                    name="category"
                                    type="checkbox"
                                    onChange={handleCategoryChange}
                                    value={category.key}
                                    id={`inline-${category.key}`}
                                    key={`${category.key}`}
                                />
                            ))}
                        </div>
                        <h5 className='text-start'>Price</h5>
                        <hr />
                        <div key={`inline-checkbox-price`} className="mb-3 text-start">
                            {aggs['Price Aggregation']?.map((price) => (
                                <Form.Check
                                    inline
                                    label={`${price.key} (${price.count})`}
                                    name="price"
                                    type="checkbox"
                                    value={price.key}
                                    onChange={handlePriceChange}
                                    id={`inline-${price.key}`}
                                    key={`${price.key}`}
                                />
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
}

export default Search;