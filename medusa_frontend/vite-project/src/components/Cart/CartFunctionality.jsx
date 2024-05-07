import React, { useEffect, useState, useContext } from 'react';
import { useCart, useCreateLineItem } from 'medusa-react';
import { StoreContext } from '../context/StoreContext'; 
import CartModal from './CartModal'; // Importer CartModal


const Cart = ({ product, variant, formattedPrice }) => {
    const { cart, createCart } = useCart();
    const { cart: cart2, setCart } = useCart();
    const { cart: contextCart, setCart: setContextCart } = useContext(StoreContext); 

    const createLineItem = useCreateLineItem(cart.id && cart2.id);
    const [showModal, setShowModal] = useState(false); // Tilstand for at styre synligheden af modalen

    useEffect(() => {
        handleCreateCart();
    }, []);

    const handleCreateCart = () => {
        if (!cart.id && !contextCart) {
            createCart.mutate(
                {}, 
                {
                    onSuccess: ({ cart }) => {
                        console.log('Ny vogn oprettet!');
                        localStorage.setItem("cart_id", cart.id);
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
                    setCart(cart);
                    setContextCart(cart);
                    setShowModal(true); // Vis modalen når produktet tilføjes til kurven
                    setTimeout(() => setShowModal(false), 3000); // Luk modalen efter 2 sekunder
                }
            }
        );
    }


    const goToCart = () => {
        // Gå til kurvens side
        // Du skal implementere navigationen til kurvens side her, f.eks. ved hjælp af React Router
    };

    return (
        <div>
      
            <button onClick={()=> handleAddItem(product.variants[0],1)}>Add to cart</button>
    <div>
            {showModal && <CartModal productName={product.title}  goToCart={goToCart} />}</div>
        </div>
    );
};

export default Cart;
