import React, { useState } from 'react'; // Importerer React og useState-hooket


const FormComponent = ({ onSubmit }) => {
  // Opretter state til at håndtere formdata og fejl
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    phone: '',
    country: ''
  });
  const [formErrors, setFormErrors] = useState({});

// Funktion til at håndtere ændringer i formularen
const handleFormChange = (e) => {
  const { name, value } = e.target; // Udtrækker navn og værdi fra inputfeltet
  setFormData({ // Opdaterer formData-state med det nye navn og værdi
    ...formData,
    [name]: value
  });
};

// Funktion til at validere formularen
const validateForm = () => {
  let errors = {}; // Initialiserer et tomt objekt til fejlmeddelelser
  Object.keys(formData).forEach(key => { // Looper gennem hvert felt i formData
    if (!formData[key].trim()) { // Hvis feltet er tomt (uden tekst)
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} skal udfyldes`; // Tilføjer en fejlmeddelelse for feltet
    }
  });
  setFormErrors(errors); // Opdaterer formErrors-state med fejlmeddelelser
  return Object.keys(errors).length === 0; // Returnerer true, hvis der ikke er nogen fejl, ellers false
};

// Funktion til at håndtere formularindsendelse
const handleSubmit = (e) => {
  e.preventDefault(); // Forhindrer standardformularindsendelsesadfærd
  if (validateForm()) { // Validerer formularen
    onSubmit(formData); // Kalder onSubmit-funktionen med formData som argument, hvis validering er vellykket
  }
};


// Returnerer JSX til visning af formularen
return (
  <form onSubmit={handleSubmit}>
    {/* Mapper gennem formdata og viser et inputfelt for hvert felt */}
    {Object.keys(formData).map(key => (
      <div key={key}>
        {/* Viser label for hvert felt */}
        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
        {/* Inputfeltet, der er bundet til værdien af det tilsvarende felt i formData */}
        <input
          type="text"
          name={key}
          value={formData[key]} // Værdien af inputfeltet sættes til værdien af det tilsvarende felt i formData
          onChange={handleFormChange} // onChange-begivenheden udløser handleFormChange-funktionen ved ændringer i inputfeltet
        />
        {/* Viser fejlmeddelelse, hvis der er fejl i feltet */}
        {formErrors[key] && <p className="error">{formErrors[key]}</p>}
      </div>
    ))}
    {/* Knappen til at gemme formularen */}
    <button type="submit">Gem</button>
  </form>
);
}

export default FormComponent; // Eksporterer komponenten "FormComponent"
