import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout'; 
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { BsCart4 } from "react-icons/bs";


const Detail = ({products, addToCart}) => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("../books.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.data)
                setBook(data.data.items.find((book) => book.id == id));
            })
            .catch((err) => {
                setError(err.message);
            });
        }, []);

    return (
        <Layout>
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6 text-center">
                            <Image  src={book.cover} className='mb-5 mb-md-0'  />
                            </div>
                        <div className="col-md-6">
                            <div className="small mb-1">ISBN: {book.ISBN}</div>
                            <h1 className="display-5 fw-bolder">{book.title}</h1>
                            <div className="fs-5 mb-5">
                                <span>${book.price}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="p-2">Fecha de Publicacion: <p>{book.publication_date}</p></div>
                                <div className="p-2">Autores: 
                                    {book.authors?.map((author) => (
                                        <p key={`author-${author.id}`}>{author.name}</p>
                                    ))}
                                </div>
                                <div className="p-2">Categoria:
                                    <p>{book.category}</p>
                                </div>
                            </div>
                            <Button variant='outline-dark align-middle' onClick={()=>{addToCart(book)}}><BsCart4 className='me-1'/> Add to cart</Button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
  };
  
const mapStateToProps = state => {
    return {
        products: state.products // access the products data from the Redux store
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: product => dispatch(addToCart(product)) // dispatch the addToCart action to add item to cart
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);