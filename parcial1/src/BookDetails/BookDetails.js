import React, { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import './BookDetails.css';  

function BookDetails({ selectedCafe }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (selectedCafe && selectedCafe.id) {
      fetch(`/api/cafes/${selectedCafe.id}/imagen`)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        })
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [selectedCafe]);

  return selectedCafe ? (
    <Col md={4}>
      <div className="cafe-details"> 
        <Card>
          <Card.Body>
            <Card.Text>
              <b>Nombre: {selectedCafe.nombre || ''}</b>
            </Card.Text>
            <Card.Text>
              Fecha de Cultivación: {selectedCafe.fecha_cultivo || ''}
            </Card.Text>
            <Card.Text>
              <b>Notas</b>
              {selectedCafe.notas || ''}
            </Card.Text>
            <Card.Text>
              <b>Cultivado a una altura de</b>
              <b>{selectedCafe.altura || ''}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  ) : null;
}

export default BookDetails;