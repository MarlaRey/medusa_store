import React from 'react'
import {Link, Outlet} from "react-router-dom"
import Cart from '../components/Cart/CartFunctionality'



export const Layout = () => {
  return (
    <div>
      <nav><ul>
        <li><Link to="/home">home</Link></li>
        <li><Link to="/products">products</Link></li>
        </ul></nav>
        <Cart></Cart>
        <Outlet />

      <footer>footer</footer>
    </div>
  )
}


