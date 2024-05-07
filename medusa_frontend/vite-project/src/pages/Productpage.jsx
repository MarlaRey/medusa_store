import React from 'react'
import Products from '../components/Products/ProductCollection';
import HeaderBanner from '../components/HeaderBanner/HeaderBanner';




const Productpage = () => {
  


  return (
    <>
     <HeaderBanner/>

      {<Products/>}

    </>
  );
};

export default Productpage;
