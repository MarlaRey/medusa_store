import React, { useEffect, useContext } from 'react';
import { useCart, useCreateLineItem } from 'medusa-react';
import { formatVariantPrice, useProducts, useRegions } from "medusa-react";
import { StoreContext } from '../context/StoreContext'; // Importer StoreContext

import Products from '../Products/ProductCollection';

const Cart = ({ product, variant }) => {
    const { cart, createCart } = useCart();
    const { cart: cart2, setCart } = useCart();
    const { cart: contextCart, setCart: setContextCart } = useContext(StoreContext); // Brug StoreContext

    const createLineItem = useCreateLineItem(cart.id && cart2.id);

    // Noget der kun sker EN gang:
    useEffect(() => {
        handleCreateCart(); // Kald handleCreateCart, når komponenten først monteres
    }, []);

    const handleCreateCart = () => {
        // Kontroller om der allerede er en vogn
        if (!cart.id && !contextCart) {
            createCart.mutate(
                {}, 
                {
                    onSuccess: ({ cart }) => {
                        console.log('Ny vogn oprettet!');
                        localStorage.setItem("cart_id", cart.id);
                        // Gem kurvtilstanden i contextCart
                        setContextCart(cart);
                    },
                }
            );
        } else {
            console.log('Vogn eksisterer allerede!');
        }
    }
    

    const handleAddItem = (variants, quantity) => {
        const variant_id = variants.id;
        createLineItem.mutate(
            {
                variant_id: variant_id,
                quantity,
            }, 
            {
                onSuccess: ({ cart }) => {
                    console.log(`Added ${quantity} of ${product.title} to cart`);
                    console.log(cart.items);
                    // Opdater kurvtilstanden ved kun at tilføje det nye element i stedet for at gemme hele kurven igen
                    setCart(cart);
                    // Opdater contextCart
                    setContextCart(cart);
                }
            }
        );
    }

    return (
        <div>
            <h3>Cart</h3>
            <button onClick={()=> handleAddItem(product.variants[0],1)}>Add to cart</button>
        </div>
    );
};

export default Cart;
