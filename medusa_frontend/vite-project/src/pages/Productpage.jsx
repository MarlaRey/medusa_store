import React from 'react'
import Products from '../components/Products/ProductCollection';
import Cart from '../components/Cart/CartFunctionality';
import HeaderBanner from '../components/HeaderBanner/HeaderBanner';




const Productpage = () => {
  


  return (
    <>
     <HeaderBanner text="We love coffee And so do you" />

      {<Products/>}

    </>
  );
};

export default Productpage;
