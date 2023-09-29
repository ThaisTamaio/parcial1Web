import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import BookCatalog from '../BookCatalog/BookCatalog';
import BookDetails from '../BookDetails/BookDetails';

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const { isbn } = useParams();
  const [error, setError] = useState(null);
  const { state: { userRole } } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://my.api.mockaroo.com/Books.json?key=13d161b0");
        if (!response.ok) {
          throw new Error("Error al obtener los libros");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (isbn) {
        try {
          const response = await fetch(`https://my.api.mockaroo.com/books/${isbn}.json?key=13d161b0`);
          if (!response.ok) {
            throw new Error("Error al obtener los detalles del libro");
          }
          const data = await response.json();
          setSelectedBook(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchBookDetails();
  }, [isbn]);

  useEffect(() => {
    if (selectedBook) {
      setFieldValues({
        title: selectedBook.title,
        author: selectedBook.author,
        isbn: selectedBook.isbn,
        publisher: selectedBook.publisher
      });
    }
  }, [selectedBook]);

  const handleInputChange = (field, value) => {
    setFieldValues({
      ...fieldValues,
      [field]: value
    });
  };

  return (
    <Container className="home-container">
      <Row>
        <BookCatalog
          books={books}
          onSelectBook={setSelectedBook}
          selectedBook={selectedBook}
        />
        <BookDetails
          selectedBook={selectedBook}
          userRole={userRole}
          fieldValues={fieldValues}
          onInputChange={handleInputChange}
        />
      </Row>
    </Container>
  );
}

export default Home;