import React from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsFillStarFill } from "react-icons/bs";


const BookList = ({ books }) => {
    return (
        <div className='row row-cols-1 row-cols-md-4 g-3'>
            {books.map((book) => {
                if (book.status != "activo") {
                    return null;
                }
                return (
                    <div key={book.id}  className='col d-flex justify-content-center'>
                        <Link to={`/book/${book.id}`} className='text-decoration-none'>
                            <Card className="h-100" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={book.cover} height={200}/>
                                <Card.Body className='p-4'>
                                <div className="text-center">
                                    <h6 className="fw-bolder">{book.title}</h6>
                                    <div className="d-flex justify-content-center small text-warning mb-2 ">
                                        {[...Array(book.range)].map((x, i) => <BsFillStarFill key={i} className='mx-1' />)}
                                    </div>
                                    {book.price} $
                                </div>
                                </Card.Body>
                                <Card.Footer className="p-4 pt-0 border-top-0 bg-transparent">
                                    <div className='text-center'><Button variant="outline-dark">Ver Detalle</Button></div>
                                </Card.Footer>
                            </Card>
                        </Link>   
                    </div> 
                )
            })}
        </div>
    );
  };
  
  export default BookList;