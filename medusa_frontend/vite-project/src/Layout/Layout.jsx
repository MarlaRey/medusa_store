import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Layout.module.scss';
import logoImage from "../assets/img/logo/Coffee.png";
import logobg from "../assets/img/logo/Ellipse 1.png";
import logoText from "../assets/img/logo/Sunshine Coffee.png";

export const Layout = () => {
  return (
    <>
      <div className={styles.navbar}>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>
        <div className={styles.logoContainer}>
          <Link to="/home">
          <img src={logoText} alt="Logo" className={styles.logoText} />
            <img src={logobg} alt="Logo Background" className={styles.logoBackground} />
            <img src={logoImage} alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.icons}>
          <FaShoppingCart />
        </div>
      </div>
     
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
      <footer>footer</footer>
    </>
  );
};
