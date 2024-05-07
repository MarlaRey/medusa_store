import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Frontpage} from "./pages/Frontpage"
import Productpage from './pages/Productpage'
import {Layout} from './Layout/Layout'
import { Cartpage } from './pages/Cartpage'
import styles from "./App.module.scss";
import ReactGA from "react-ga4";


function App() {
  ReactGA.initialize("G-DNP3DQLWZ3");
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Frontpage />} /> {/* Dette viser Frontpage når roden '/' er besøgt */}
        <Route path='/home' element={<Frontpage/>}/>
        <Route path='/products' element={<Productpage/>}/>
        <Route path='/cart' element={<Cartpage/>}/>
        <Route path='/*' element={<h1>page doesn't exist</h1>}/>
        </Route>
      </Routes>
    </Router>
  )
}


export default App
