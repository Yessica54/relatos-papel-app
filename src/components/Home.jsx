import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import BookList from './Books/BookList';
import Search from './Search';
import Image from 'react-bootstrap/Image';
import logo from '../assets/logo-cover.png';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const Home = () => { 

    const [books, setBooks] = useState([]);
    const [aggs, setAggs] = useState([]);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        getData("","","","","","","","", 1);
    }, []);
  
    const getData = (title,categoriesValues, ISBN, author, range, availability, priceValues,currencyValues,page) => {

        let paramQuery = {page: page-1}
      
        if (title != "") {
            paramQuery["title"] = title
        }
        if (ISBN != "") {
            paramQuery["ISBN"] = ISBN
        }
        if (author != "") {
            paramQuery["author"] = author
        }
        if (range != "") {
            paramQuery["range"] = range
        }
        if (availability != "") {
            paramQuery["availability"] = availability
        }
        if (priceValues.length > 0) {
            paramQuery["range_price"] = priceValues
        }

        if (categoriesValues.length > 0) {
            paramQuery["categories"] = categoriesValues
        }

        if (currencyValues.length > 0) {
            paramQuery["currencies"] = currencyValues
        }
        const params = new URLSearchParams(paramQuery).toString();

        fetch(`http://ec2-3-135-221-63.us-east-2.compute.amazonaws.com:8080/ms-books-catalogue/books?${params}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch books");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data.books.content)
                setBooks(data.books.content);
                setAggs(data.aggs);
                setTotalPages(data.books.totalPages);
            })
            .catch((err) => {
                console.log(err)
                setError(err.message);
            });
    }

    const searchBooks = (term, ISBN, author, selectedCategories, selectedPrice) => {
        setCurrentPage(1);
        console.log(selectedCategories)
        return getData(term,selectedCategories.join(','),ISBN,author,"","",selectedPrice.join(','),"", currentPage);
    }

    return (   
        <Layout>
            <div className='px-4 py-5 my-5 text-center text-bg-dark'>
                <Image src={logo}></Image>
                <div className='col-lg-6 mx-auto mb-4 mt-5'>
                    <Search searchBooks={searchBooks} aggs={aggs}/>
                </div>
            </div>
            <Container className='container'>
                <BookList books={books}/>
                <div className='col d-flex justify-content-center'>
                    <nav>
                        <ul className="pagination mt-3">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Anterior
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Siguiente
                            </button>
                        </li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </Layout>  
    );
};

export default Home;