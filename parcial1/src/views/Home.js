import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
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

  const renderEditableField = (label, value) => {
    return userRole ? (
      <div>
        <label>{label}:</label>
        <input type="text" defaultValue={value} />
      </div>
    ) : (
      <Card.Text>
        {label}: {value}
      </Card.Text>
    );
  };

  return (
    <Container className="home-container">
      <Row>
        <Col md={6}>
          <h2>Catálogo de Libros</h2>
          <Row>
            {books.map((book) => (
              <Col md={4} key={book.isbn}>
                <Card
                  onClick={() => setSelectedBook(book)}
                  className={`book-card ${
                    selectedBook && selectedBook.isbn === book.isbn ? "selected" : ""
                  }`}
                >
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.author}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          {selectedBook && (
            <div className="book-details">
              <h2>Detalles del Libro</h2>
              <Card>
                <Card.Body>
                  {renderEditableField('Título', selectedBook.title)}
                  {renderEditableField('Autor', selectedBook.author)}
                  {renderEditableField('ISBN', selectedBook.isbn)}
                  {renderEditableField('Editorial', selectedBook.publisher)}
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;