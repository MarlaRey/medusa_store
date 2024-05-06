import React, { useState } from 'react';

const FormComponent = ({ onSubmit }) => {
  // Tilstande for formularværdier og fejl
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    phone: '',
    province: '',
    country: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Funktion til opdatering af formularværdier
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funktion til validering af formular
  const validateForm = () => {
    let errors = {};
    if (!formData.firstname.trim()) {
      errors.firstname = 'Fornavn skal udfyldes';
    }
    // Tilføj validering for de andre felter efter behov
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Funktion til afsendelse af formular
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Fornavn:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleFormChange}
        />
        {formErrors.firstname && <p className="error">{formErrors.firstname}</p>}
      </div>
      {/* Tilføj resten af inputfelterne her */}
      <button type="submit">Gem</button>
    </form>
  );
};

export default FormComponent;
