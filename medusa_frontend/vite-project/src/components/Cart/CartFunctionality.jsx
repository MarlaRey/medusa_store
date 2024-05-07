import React, { useEffect, useState, useContext } from 'react'; // Importerer nødvendige ressourcer fra React
import { useCart, useCreateLineItem } from 'medusa-react'; // Importerer brugerdefinerede hooks fra "medusa-react"
import { StoreContext } from '../context/StoreContext'; // Importerer kontekst fra StoreContext-filen
import CartModal from './CartModal'; // Importerer CartModal-komponenten

// Definerer en funktionel komponent kaldet "Cart", der modtager produkt som props
const Cart = ({ product }) => {
    // Bruger brugerdefinerede hooks til at hente indkøbskurv og oprette linjeelement
    const { cart, createCart } = useCart();
    const { cart: cart2, setCart } = useCart();
    const { cart: contextCart, setCart: setContextCart } = useContext(StoreContext); // Bruger konteksten fra StoreContext-filen

    // Bruger brugerdefineret hook til at oprette linjeelementet, afhængigt af om der er en kurv
    const createLineItem = useCreateLineItem(cart.id && cart2.id);

    // Tilstand til at styre synligheden af modalen
    const [showModal, setShowModal] = useState(false);

    // Effekt, der kaldes ved komponentmontage for at håndtere oprettelse af kurv
    useEffect(() => {
        handleCreateCart();
    }, []);

    // Funktion til at håndtere oprettelse af kurv
    const handleCreateCart = () => {
        if (!cart.id && !contextCart) { // Hvis der ikke er nogen kurv i context eller state
            // Opret en ny kurv og gem den i local storage og konteksten
            createCart.mutate(
                {}, 
                {
                    onSuccess: ({ cart }) => {
                        console.log('Ny vogn oprettet!');
                        localStorage.setItem("cart_id", cart.id); // Gem kurv-ID i local storage
                        setContextCart(cart); // Opdater konteksten med den nye kurv
                    },
                }
            );
        } else {
            console.log('Vogn eksisterer allerede!'); // Hvis der allerede findes en kurv
        }
    }

    // Funktion til at håndtere tilføjelse af element til kurven
    const handleAddItem = (variants, quantity) => {
        const variant_id = variants.id; // Hent ID på varianten

        // Opret et linjeelement og opdater kurven og konteksten
        createLineItem.mutate(
            {
                variant_id: variant_id,
                quantity,
            }, 
            {
                onSuccess: ({ cart }) => {
                    console.log(`Added ${quantity} of ${product.title} to cart`); // Log besked om tilføjelse af element til kurv
                    console.log(cart.items); // Log kurvens elementer
                    setCart(cart); // Opdater kurven i state
                    setContextCart(cart); // Opdater kurven i konteksten
                    setShowModal(true); // Vis modalen når produktet tilføjes til kurven
                    setTimeout(() => setShowModal(false), 3000); // Luk modalen efter 2 sekunder
                }
            }
        );
    }

    // Funktion til at navigere til kurvens side (mangler implementering)
    const goToCart = () => {
        // Gå til kurvens side
        // Du skal implementere navigationen til kurvens side her, f.eks. ved hjælp af React Router
    };

    // Returnerer JSX for at vise knappen til at tilføje produktet til kurven og modalen
    return (
        <div>
            <button onClick={()=> handleAddItem(product.variants[0],1)}>Add to cart</button> {/* Knappen til at tilføje produkt til kurven */}
            <div>
                {showModal && <CartModal productName={product.title}  goToCart={goToCart} />} {/* Modalen til at bekræfte tilføjelsen af produktet */}
            </div>
        </div>
    );
};

export default Cart; // Eksporterer komponenten "Cart"
