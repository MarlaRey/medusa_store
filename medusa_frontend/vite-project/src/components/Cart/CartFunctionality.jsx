import React, { useEffect } from 'react';
import { useCart, useCreateLineItem } from 'medusa-react';
import { formatVariantPrice, useProducts, useRegions } from "medusa-react";

import Products from '../Products/ProductCollection';

const Cart = ({ product, variant }) => {
    const { cart, createCart } = useCart();
    const createLineItem = useCreateLineItem(cart.id);

    // Noget der kun sker EN gang:
    useEffect(() => {
        handleCreateCart(); // Kald handleCreateCart, når komponenten først monteres
    }, []);

    const handleCreateCart = () => {
        createCart.mutate(
            {}, 
            {
                onSuccess: ({ cart }) => {
                    localStorage.setItem("cart_id", cart.id);
                    console.log(cart);
                },
            }
        );
    }

    const handleAddItem = (variants, quantity) => {
        const variant_id = variants.id;
        console.log(product);
        createLineItem.mutate(
            {
            variant_id: variant_id,
            quantity,
        }, 
        {
            onSuccess: ({ cart }) => {
                console.log(`Added ${quantity} of ${product.title} to cart`);
                console.log(cart.items);
            }
        });
    }


      return (
        <div>
          <h3>Cart</h3>
          {/* Kald addToCart uden at overføre produktet */}
          <button onClick={()=> handleAddItem(product.variants[0],1)}>Add to cart</button>
        </div>
      );
    };

export default Cart;
