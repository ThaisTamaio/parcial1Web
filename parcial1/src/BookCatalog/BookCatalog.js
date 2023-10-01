import React from 'react';
import { Table, Col } from 'react-bootstrap';
import './BookCatalog.css';

function BookCatalog({ cafes, onSelectCafe, selectedCafe, fieldValues }) {
    return (
        <Col md={6}>
            <Table hover className="cafe-table">
                <thead>
                    <tr>
                        <th className="cafe-table_bold-text">ID</th>
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
                            <td>{selectedCafe && selectedCafe.id === cafe.id ? fieldValues.nombre : cafe.nombre}</td>
                            <td>{selectedCafe && selectedCafe.id === cafe.id ? fieldValues.tipo : cafe.tipo}</td>
                            <td>{selectedCafe && selectedCafe.id === cafe.id ? fieldValues.region : cafe.region}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    );
}

export default BookCatalog;