import React, { useEffect, useState } from "react";

export const Frontpage = () => {
  const [dogImage, setDogImage] = useState(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setDogImage(data.message);
      } catch (error) {
        console.error("Error fetching dog image:", error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <div>
      <h1>Velkommen til hund:</h1>
      {dogImage && <img src={dogImage} alt="Random dog" />}
    </div>
  );
};
