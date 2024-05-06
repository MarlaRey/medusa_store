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

    <div className={styles.cartpageContainer} >
      <h2>Checkout</h2>
      <div className={styles.cartContainer}>
      <section className={styles.formularContainer}>
      <FormComponent  />
      </section>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span className={styles.quantity}>Antal:
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
              />
            </span>
            <span>Pris pr stk: {item.unit_price}DKK</span>
            <span>Ialt {item.subtotal} DKK</span>
            <button onClick={() => handleRemoveItem(item.id)}>Fjern</button>
            
          </li>
          
        ))}
        <h4><span>Din samlede pris:</span> {total} DKK </h4>
      </ul>
      
    </div>
    </div>
  );
};

export default TheCart;
