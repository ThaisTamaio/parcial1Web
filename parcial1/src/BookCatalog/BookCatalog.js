import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './BookCatalog.css';
import libro from '../assets/libro.png';

function BookCatalog({ books, onSelectBook, selectedBook }) {
  return (
    <Col md={6}>
      <h2>Catálogo de Libros</h2>
      <Row className="book-row">
        {books.map((book) => (
          <Col md={4} key={book.isbn} className="book-col">
            <Card
              onClick={() => onSelectBook(book)}
              className={`book-card ${
                selectedBook && selectedBook.isbn === book.isbn ? "selected" : ""
              }`}
            >
              <Card.Img variant="top" src={libro} />
              <Card.Body className="book-card-body">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
}

export default BookCatalog;