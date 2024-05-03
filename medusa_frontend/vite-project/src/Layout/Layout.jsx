import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importer FaShoppingCart fra react-icons
import styles from './Layout.module.scss'; // Importer SCSS-filen

export const Layout = () => {
  return (<>
    <div className={styles.navbar}>
      <div>
        <Link to="/home">
          home
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>
      <div className={styles.icons}>
        <img src={FaShoppingCart} alt="Shopping Cart" /> {/* Brug FaShoppingCart som billedkilde */}
      </div>

    </div>
          <Outlet />
          <footer>footer</footer>
          </>
  );
};
