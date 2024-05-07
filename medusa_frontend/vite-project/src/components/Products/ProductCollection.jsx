import React from "react"; 

import { 
  formatVariantPrice, // Importerer funktionen formatVariantPrice fra "medusa-react"
  useProducts, // Importerer brugerdefineret hook til at hente produkter fra "medusa-react"
  useRegions // Importerer brugerdefineret hook til at hente regioner fra "medusa-react"
} from "medusa-react";

import style from "./ProductCollection.module.scss"; // Importerer CSS-modul til styling af komponenten
import Cart from "../Cart/CartFunctionality"; // Importerer Cart-komponenten


const Products = () => {
  // Bruger brugerdefinerede hooks til at hente produkter og regioner samt loading states
  const { products, isLoading } = useProducts();
  const { regions, isLoading: isRegionsLoading } = useRegions();

  // Hvis dataene er ved at blive hentet, vises en loading-besked
  if (isLoading || isRegionsLoading) return <p>is loading...</p>;

  // Returnerer JSX til visning af produkter og deres detaljer
  return (
    <div className={style.products}>
      <h2>Our picks for you</h2> {/* Overskrift */}
      <section>
        {/* Mapper gennem produktlisten og viser hver enkelt produkt */}
        {products.map((product) => (
          <li key={product.id}> {/* Bruger produktets id som nøgle */}
            <h3>{product.title}</h3> {/* Viser produktets titel */}
            {/* Hvis produktet har billeder, vises det første billede */}
            {product.images.length > 0 && (
              <img src={product.images[0].url} alt={product.title} />
            )}
            <p className={style.description}>{product.description}</p> {/* Viser produktets beskrivelse */}
            <p>Price: 
              {/* Formatterer produktets pris baseret på regionen */}
              {formatVariantPrice({
                variant: product.variants[0],
                region: regions[0],
              })}
            </p>
            {/* Sender produktet som prop til Cart-komponenten */}
            <Cart product={product} variant={product.variants[0]} price={regions[0]} />
          </li>
        ))}
      </section>
    </div>
  );
};

export default Products; 
