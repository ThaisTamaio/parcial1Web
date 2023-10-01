import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import BookCatalog from '../BookCatalog/BookCatalog';
import BookDetails from '../BookDetails/BookDetails';
import banner from '../assets/banner.png';
import './Home.css';

function Home() {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.userRole) {
      navigate("/");
    }
  }, [location, navigate]);

  const userRole = location.state ? location.state.userRole : null;

  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch("http://localhost:3001/cafes");
    if (!response.ok) {
      throw new Error("Error al obtener los cafés");
    }
    const data = await response.json();
    console.log(data);
    setCafes(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCafe) {
      console.log(selectedCafe);
      setFieldValues({
        nombre: selectedCafe.nombre,
        tipo: selectedCafe.tipo,
        region: selectedCafe.region,
        notas: selectedCafe.notas,
        fecha_cultivo: selectedCafe.fecha_cultivo,
        altura: selectedCafe.altura,
        imagen: selectedCafe.imagen
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
      <Container className="home-container">
        <Row className="row-border">
          <h2 className="titulo">El aroma mágico</h2>
        </Row>
        <Row className="row-border">
          <img src={banner} alt="Banner" className="banner-image" />
        </Row>
        <Row>
          <BookCatalog
            cafes={cafes}
            onSelectCafe={setSelectedCafe}
            selectedCafe={selectedCafe}
            fieldValues={fieldValues}
            className="book-catalog"
          />
          <BookDetails
            selectedCafe={selectedCafe}
            userRole={userRole}
            fieldValues={fieldValues}
            onInputChange={handleInputChange}
            className="book-details"
          />
        </Row>
      </Container>
      <div className="contact-info">
        Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico
      </div>
    </div>
  );
}

export default Home;