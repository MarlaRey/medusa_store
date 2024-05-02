import React from 'react'
import {Link, Outlet} from "react-router-dom"





export const Layout = () => {
  return (
    <div>
      <nav><ul>
        <li><Link to="/home">home</Link></li>
        <li><Link to="/products">products</Link></li>
        <li><Link to="/cart">cart</Link></li>
        </ul></nav>
       
        <Outlet />

      <footer>footer</footer>
    </div>
  )
}


