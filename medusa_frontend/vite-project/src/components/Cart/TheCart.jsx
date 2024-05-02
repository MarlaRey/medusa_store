import React from 'react';
import { useCart } from 'medusa-react';

const TheCart = () => {
  const { cart } = useCart();

  // Beregn den samlede pris
  const total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <span>Produkt:{item.title}</span>
            <span>Antal:{item.quantity}</span>
            <span>Pris pr stk:{item.unit_price}</span>
            <span>Samlet pris:{item.subtotal}</span>
          </li>
        ))}
      </ul>
      <h1>Din samlede pris: {total}</h1>
    </div>
  );
};

export default TheCart;
