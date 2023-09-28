import React, {useEffect} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './scenes/global/Navbar'
import Home from './scenes/home/Home'
import CartMenu from './scenes/global/CartMenu'

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
        </Routes>
        <CartMenu/>
      </BrowserRouter>
    </div>
  )
}

export default App

