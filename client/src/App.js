import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Image to Base64 Converter</span>
        </div>
      </nav>
      <div className="container">
        <ImageUploader />
      </div>
    </div>
  );
}

export default App;
