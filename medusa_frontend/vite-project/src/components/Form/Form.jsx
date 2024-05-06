import React, { useState } from 'react';

const FormComponent = ({ onSubmit }) => {
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} skal udfyldes`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map(key => (
        <div key={key}>
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleFormChange}
          />
          {formErrors[key] && <p className="error">{formErrors[key]}</p>}
        </div>
      ))}
      <button type="submit">Gem</button>
    </form>
  );
};

export default FormComponent;
