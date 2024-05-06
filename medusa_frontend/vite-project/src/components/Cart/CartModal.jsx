import React from 'react';
import {Link, Outlet} from "react-router-dom"
import styles from "./CartModal.module.scss";
import { FaShoppingCart } from 'react-icons/fa';


const CartModal = ({ productName, closeModal }) => {



  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>

        <p className={styles.modalp}>{`Du tilføjede ${productName} til kurven`}</p>
        <Link to="/cart"className={styles.modalLink}>Se kurv<FaShoppingCart /></Link>
      </div>
    </div>
  );
};

export default CartModal;
