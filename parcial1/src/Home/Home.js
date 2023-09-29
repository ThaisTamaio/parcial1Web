import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import BookCatalog from '../BookCatalog/BookCatalog';
import BookDetails from '../BookDetails/BookDetails';
import banner from '../assets/banner.png';
import './Home.css';

function Home() {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const { id } = useParams();  // Cambiado de isbn a id
  const [error, setError] = useState(null);
  const { state: { userRole } } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/cafes");
        if (!response.ok) {
          throw new Error("Error al obtener los cafés");
        }
        const data = await response.json();
        setCafes(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3001/cafes/${id}`);
          if (!response.ok) {
            throw new Error("Error al obtener los detalles del café");
          }
          const data = await response.json();
          setSelectedCafe(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    if (selectedCafe) {
      setFieldValues({
        nombre: selectedCafe.nombre,
        tipo: selectedCafe.tipo,
        region: selectedCafe.region,
        // ... (otros campos del objeto café)
      });
    }
  }, [selectedCafe]);

  const handleInputChange = (field, value) => {
    setFieldValues({
      ...fieldValues,
      [field]: value
    });
  };

  return (
    <div>
      <div>
        <h2 className="titulo">El aroma mágico</h2>
      </div>
      <div className="banner-container">
        <img src={banner} alt="Banner" className="banner-image" />
      </div>
      <Container className="home-container">
        <Row>
          <BookCatalog
            cafes={cafes}
            onSelectCafe={setSelectedCafe}
            selectedCafe={selectedCafe}
          />
          <BookDetails
            selectedCafe={selectedCafe}
            userRole={userRole}
            fieldValues={fieldValues}
            onInputChange={handleInputChange}
          />
        </Row>
      </Container>
    </div>
  );
}

export default Home;