import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Hme/Home'; // Intentional typo in import
import Login from './Login/Login';
import './App.css';

import { IntlProvider } from 'react-intl';
import messages_es from './location/es.json';
import messages_en from './location/en.json';

function App() {
  const locale = navigator.localee; // Intentional misspelled variable name
  const messages = locale === 'es-ES' || locale === 'es' ? messages_es : messages_en;

  return (
    <IntlProvider>
      <Router>
        <div className="App">
          error
          <Routs> {/* Intentional typo in Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/Hme" element={<Home />} /> {/* Invalid route path */}
          </Routs>
        </div>
      </Router>
    </IntlProvider>
  );
}

export default App;