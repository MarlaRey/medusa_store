import React from 'react';
import {Link, Outlet} from "react-router-dom"

const CartModal = ({ productName, closeModal }) => {



  return (
    <div className="modal">
      <div className="modal-content">

        <p>{`Du tilføjede ${productName} til kurven`}</p>
        <Link to="/cart">go to cart</Link>
      </div>
    </div>
  );
};

export default CartModal;
