import React from 'react';
import { Col, Card } from 'react-bootstrap';
import './BookDetails.css';

function BookDetails({ selectedBook, userRole, fieldValues, onInputChange }) {
  const renderEditableField = (label, field) => {
    const value = fieldValues[field];
    return userRole ? (
      <div>
        <div>
          <label className = "BookDetails_label">{label}:</label>
        </div>
        <input
          type="text"
          className="BookDetails_input"
          value={value || ''}
          onChange={(e) => onInputChange(field, e.target.value)}
        />
      </div>
    ) : (
      <Card.Text>
        {label}: {value}
      </Card.Text>
    );
  };

  return selectedBook ? (
    <Col md={6}>
      <div className="book-details">
        <h2>Detalles del Libro</h2>
        <Card>
          <Card.Body>
            {renderEditableField('Título', 'title')}
            {renderEditableField('Autor', 'author')}
            {renderEditableField('ISBN', 'isbn')}
            {renderEditableField('Editorial', 'publisher')}
          </Card.Body>
        </Card>
      </div>
    </Col>
  ) : null;
}

export default BookDetails;