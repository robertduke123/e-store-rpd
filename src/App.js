import React, {useEffect} from 'react'
import './App.css'
// import { commerce } from './lib/commerce'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './scenes/global/Navbar'
import Home from './scenes/home/Home'
import CartMenu from './scenes/global/CartMenu'
import ItemDetails from './scenes/itemDetails/ItemDetails'
import Footer from './scenes/global/Footer'
import Signin from './scenes/user/Signin'
import Register from './scenes/user/Register'
import Profile from './scenes/user/Profile'
import Checkout from './scenes/CheckoutV2/Checkout/Checkout'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
  window.scrollTo(0, 0)
}, [pathname])
}

const App = () => {

  

  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
      <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/item/:itemId' element={<ItemDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
        <CartMenu/>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

