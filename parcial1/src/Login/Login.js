import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from '../assets/banner.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  async function handleLogin() {
    const response = await fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.status === 200) {
      navigate("/Home", { state: { userRole: "admin" } });  // Asumiendo el rol de admin
    } else {
      const errorMessage = data.message === "The provided credentials are incorrect."
        ? "La contraseña o el usuario son incorrectos"
        : data.message;
      setError(errorMessage || "No se pudo iniciar sesión");
    }
  }

  return (
    <div>
      <div>
        <h2 className="titulo">El aroma mágico</h2>
      </div>
      <img src={banner} alt="Banner" className="banner-image" />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2>Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;