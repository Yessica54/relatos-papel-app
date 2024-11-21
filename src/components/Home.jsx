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
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Número de elementos por página

    // Calcular el índice de los elementos para la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        fetch("books.json")
            .then((res) => {
                console.log(res)
                return res.json();
            })
            .then((data) => {
                setBooks(data.data.items);
                setFilteredData(data.data.items)
            })
            .catch((err) => {
                console.log(err)
                setError(err.message);
            });
        }, []);
         
    const searchBooks = (term) => {
        setCurrentPage(1);
        if(term != ""){
            return setFilteredData(
                books.filter( (books) => {
                        const authorFind = books.authors.some((autor) =>
                            autor.name.toLowerCase().includes(term)
                        ); 
                        return (
                            books.title.toLowerCase().includes(term) 
                            || books.category.toLowerCase().includes(term)
                            || authorFind
                        )
                    }  
                )
            )
        }
        return setFilteredData(books)
    }

    return (   
        <Layout>
            <div className='px-4 py-5 my-5 text-center text-bg-dark'>
                <Image src={logo}></Image>
                <div className='col-lg-6 mx-auto mb-4 mt-5'>
                    <Search searchBooks={searchBooks}/>
                </div>
            </div>
            <Container className='container'>
                <BookList books={currentItems}/>
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