import React from "react";
import { formatVariantPrice, useProducts, useRegions } from "medusa-react";
import style from "./ProductCollection.module.scss";
import Cart from "../Cart/CartFunctionality";

const Products = () => {
  const { products, isLoading } = useProducts();
  const { regions, isLoading: isRegionsLoading } = useRegions();

  if (isLoading || isRegionsLoading) return <p>is loading...</p>;

  return (
    <div className={style.products}>
      <h2>Our picks for you</h2>
      <section>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            {product.images.length > 0 && (
              <img src={product.images[0].url} alt={product.title} />
            )}
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>Price: 
              {formatVariantPrice({
                variant: product.variants[0],
                region: regions[0],
              })}
            </p>
            {/* Send product som prop til Cart */}
            <Cart product={product} variant={product.variants[0]} price={regions[0]} />
          </li>
        ))}
      </section>
    </div>
  );
};

export default Products;