import React, { useEffect, useState, useCallback } from 'react';
import { Col, Card } from 'react-bootstrap';
import './BookDetails.css';

function BookDetails({ selectedCafe }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [cafeDetails, setCafeDetails] = useState({});

  const fetchCafeDetails = useCallback(async () => {
    if (selectedCafe && selectedCafe.id) {
      const response = await fetch(`http://localhost:3001/cafes/${selectedCafe.id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del café");
      }
      const data = await response.json();
      setCafeDetails(data);
    }
  }, [selectedCafe]);

  useEffect(() => {
    fetchCafeDetails();
  }, [fetchCafeDetails]);

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

  return (
    <Col md={4}>
      <div className="cafe-details"> 
        <Card className="cafe-card">
          <Card.Body>
            <Card.Text className="cafe-name">
              {cafeDetails.nombre || ''}
            </Card.Text>
            <Card.Text className="cafe-date">
              {cafeDetails.fecha_cultivo || ''}
            </Card.Text>
            {imageSrc && (
              <div className='cafe-image'>
                <img src={cafeDetails.imagen} alt="Imagen del café" className='cafe-image-img'/>
              </div>
            )}
            <Card.Text className="cafe-notes">
              Notas
            </Card.Text>
            <Card.Text className="cafe-notes2">
              {cafeDetails.notas || ''}
            </Card.Text>
            <Card.Text className="cafe-altitude">
              Cultivado a una altura de:
            </Card.Text>
            <Card.Text className="cafe-altitude2">
              {cafeDetails.altura || ''} msnm
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
}

export default BookDetails;