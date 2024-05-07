import React, { useContext } from 'react'; // Importerer nødvendige ressourcer fra React
import { useCart } from 'medusa-react'; // Importerer brugerdefinerede hooks fra "medusa-react"
import { StoreContext } from '../context/StoreContext'; // Importerer kontekst fra StoreContext-filen
import styles from "./TheCart.module.scss"; // Importerer CSS-modul til styling af komponenten
import FormComponent from '../Form/Form'; // Importerer FormComponent-komponenten


const TheCart = () => {
  // Bruger brugerdefinerede hooks til at hente indkøbskurv og opdatere kurv
  const { cart, setCart } = useCart();
  const { cart: contextCart, setCart: setContextCart } = useContext(StoreContext); // Bruger konteksten fra StoreContext-filen

  // Funktion til at opdatere antallet af en vare i kurven
  const handleUpdateQuantity = (lineItemId, quantity) => {
    const updatedQuantity = Number(quantity); // Konverterer den nye mængde til et tal
    if (!isNaN(updatedQuantity)) { // Hvis den nye mængde er et tal
      // Opdaterer kurven med den nye mængde og subtotal
      const updatedCart = {
        ...cart, // Kopierer kurvens eksisterende data
        items: cart.items.map(item => {
          if (item.id === lineItemId) { // Finder den specifikke vare, der skal opdateres
            const updatedItem = { ...item, quantity: updatedQuantity }; // Opdaterer mængden af varen
            updatedItem.subtotal = updatedItem.quantity * updatedItem.unit_price; // Opdaterer subtotalen baseret på den nye mængde
            return updatedItem; // Returnerer den opdaterede vare
          }
          return item; // Returnerer den uændrede vare, hvis den ikke skal opdateres
        })
      };
      setCart(updatedCart); // Opdaterer kurven i state med den nye data
      setContextCart(updatedCart); // Opdaterer kurven i konteksten med den nye data
    }
  };

  // Funktion til at fjerne en vare fra kurven
  const handleRemoveItem = (lineItemId) => {
    // Fjerner varen fra kurven
    const updatedCart = {
      ...cart, // Kopierer kurvens eksisterende data
      items: cart.items.filter(item => item.id !== lineItemId) // Filtrer alle varer undtagen den, der skal fjernes
    };
    setCart(updatedCart); // Opdaterer kurven i state med den nye data
    setContextCart(updatedCart); // Opdaterer kurven i konteksten med den nye data
  };


  // Beregn den samlede pris for alle elementer i kurven
  const total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

  // Returnerer JSX for at vise indkøbskurven og formular til checkout
  return (
    <div className={styles.cartpageContainer}>
      <h2>Checkout</h2>
      <div className={styles.cartContainer}>
        <section className={styles.formularContainer}>
          <FormComponent /> {/* Formular til at indsende ordren */}
        </section>
        <ul>
          {/* Mapper gennem hver vare i kurven og viser detaljer og mulighed for at opdatere mængde eller fjerne varen */}
          {cart.items.map(item => (
            <li key={item.id}>
              <span>{item.title}</span>
              {/* Viser et inputfelt til at opdatere mængden af varen */}
              <span className={styles.quantity}>Antal:
                <input
                  type="number" // Angiver inputtypen som numerisk for at tillade kun numeriske værdier
                  value={item.quantity} // Sætter værdien af inputfeltet til den aktuelle mængde af varen
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))} // Kalder handleUpdateQuantity-funktionen ved ændring af værdien i inputfeltet
                />
              </span>

              <span>Pris pr stk: {item.unit_price}DKK</span>
              <span>Ialt {item.subtotal} DKK</span>
              <button onClick={() => handleRemoveItem(item.id)}>Fjern</button> {/* Knappen til at fjerne varen fra kurven */}
            </li>
          ))}
          <h4><span>Din samlede pris: </span> {total} DKK </h4> {/* Totalprisen for alle varer i kurven */}
        </ul>
      </div>
    </div>
  );
};

export default TheCart; 
