import React, { useContext } from 'react';
import { useCart } from 'medusa-react';
import { StoreContext } from '../context/StoreContext';
import styles from "./TheCart.module.scss";
import FormComponent from '../Form/Form';


const TheCart = () => {
  const { cart, setCart } = useCart();
  const { cart: contextCart, setCart: setContextCart } = useContext(StoreContext);


  // Funktion til at opdatere antallet af en vare
  const handleUpdateQuantity = (lineItemId, quantity) => {
    console.log("New quantity:", quantity);
    const updatedQuantity = Number(quantity);
    if (!isNaN(updatedQuantity)) {
      const updatedCart = {
        ...cart,
        items: cart.items.map(item => {
          if (item.id === lineItemId) {
            const updatedItem = { ...item, quantity: updatedQuantity };
            updatedItem.subtotal = updatedItem.quantity * updatedItem.unit_price; // Opdater subtotalen
            return updatedItem;
          }
          return item;
        })
      };
      setCart(updatedCart);
      setContextCart(updatedCart);
    }
  };

  // Funktion til at fjerne en vare fra kurven
  const handleRemoveItem = (lineItemId) => {
    const updatedCart = {
      ...cart,
      items: cart.items.filter(item => item.id !== lineItemId)
    };
    setCart(updatedCart);
    setContextCart(updatedCart);
  };

  // Beregn den samlede pris
  const total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

  return (

    <div className={styles.cartContainer}>
      <h1>Shopping Cart</h1>
      <section className={styles.formularContainer}>
      <FormComponent  />
      </section>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <span>Produkt: {item.title}</span>
            <span>Antal:
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
              />
            </span>
            <span>Pris pr stk: {item.unit_price}</span>
            <span>Samlet pris: {item.subtotal}</span>
            <button onClick={() => handleRemoveItem(item.id)}>Fjern</button>
          </li>
        ))}
      </ul>
      <h1>Din samlede pris: {total}</h1>
    </div>

  );
};

export default TheCart;
