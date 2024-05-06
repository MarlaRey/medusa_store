import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Frontpage} from "./pages/Frontpage"
import Productpage from './pages/Productpage'
import {Layout} from './Layout/Layout'
import { Cartpage } from './pages/Cartpage'
import styles from "./App.module.scss";



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
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
