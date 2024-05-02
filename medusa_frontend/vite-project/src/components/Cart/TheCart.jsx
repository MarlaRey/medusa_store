import React from 'react';
import { useCart } from 'medusa-react';

const TheCart = () => {
  const { cart } = useCart();
  console.log(cart);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span>{item.quantity}</span>
            <span>{item.variant.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TheCart;
