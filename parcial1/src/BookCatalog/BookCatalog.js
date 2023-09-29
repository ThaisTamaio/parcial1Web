import React from 'react';
import { Table, Col } from 'react-bootstrap';
import './BookCatalog.css';

function BookCatalog({ cafes, onSelectCafe, selectedCafe }) {
  return (
    <Col md={6}>
      <Table striped bordered hover className="cafe-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo de Café</th>
            <th>Región</th>
          </tr>
        </thead>
        <tbody>
          {cafes.map((cafe) => (
            <tr
              key={cafe.id}
              onClick={() => onSelectCafe(cafe)}
              className={selectedCafe && selectedCafe.id === cafe.id ? 'selected' : ''}
            >
              <td>{cafe.id}</td>
              <td>{cafe.nombre}</td>
              <td>{cafe.tipo}</td>
              <td>{cafe.region}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
}

export default BookCatalog;
