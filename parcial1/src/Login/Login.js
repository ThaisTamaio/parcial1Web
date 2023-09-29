import React, { useState, useEffect } from "react";  // Importa useEffect
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();
  const API_KEY = "4cf9a140";
  const [formData, setFormData] = useState({ id: 1, email: "", password: "" });
  const [emailValid, setEmailValid] = useState(false);  // Cambia el valor inicial a false
  const [passwordValid, setPasswordValid] = useState(false);  // Cambia el valor inicial a false
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState("");
  const [lastId, setLastId] = useState(1);

  const handleEmailChange = (e) => {
    setEmailTouched(true);
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordTouched(true);
    setFormData({ ...formData, password: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    setEmailValid(isEmailValid);
  };

  const validatePassword = (password) => {
    const isPasswordValid = password.length > 6;
    setPasswordValid(isPasswordValid);
  };

  // Efecto que se ejecuta cada vez que formData.email o formData.password cambian
  useEffect(() => {
    validateEmail(formData.email);
    validatePassword(formData.password);
  }, [formData.email, formData.password]);

  async function handlePost() {
    if (!emailValid || !passwordValid) {
      setError("El correo electrónico o la contraseña son inválidos");
      return;
    }

    // Si pasa las validaciones, continuar con la solicitud POST
    const response = await fetch(
      "https://my.api.mockaroo.com/Login.json?key=13d161b0&__method=POST"
    );
    const data = await response.json();
    if (data && data.role !== undefined) {
      // Si el inicio de sesión es exitoso y 'role' está definido en el primer elemento de 'data'
      navigate("/Home", { state: { userRole: data.role } });
    } else {
      setError("No se pudo obtener el rol del usuario");
    }

    setLastId(lastId + 1);
    setFormData({ id: lastId + 1, email: "", password: "" });
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src="ruta_de_la_imagen.png"
            alt="Imagen de inicio de sesión"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h2>Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className={`form-control ${emailValid || !emailTouched ? "" : "is-invalid"}`}
                value={formData.email}
                onChange={handleEmailChange}
              />
              {!emailValid && emailTouched && <div className="invalid-feedback">Correo electrónico no válido</div>}
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className={`form-control ${passwordValid || !passwordTouched ? "" : "is-invalid"}`}
                value={formData.password}
                onChange={handlePasswordChange}
              />
              {!passwordValid && passwordTouched && (
                <div className="invalid-feedback">La contraseña debe ser de 6 caracteres</div>
              )}
            </div>
            <button type="button" className="btn btn-primary" onClick={handlePost}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
