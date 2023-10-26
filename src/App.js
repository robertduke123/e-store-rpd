import React, {useEffect} from 'react'
import './App.css'
import { commerce } from './lib/commerce'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItems, addToken, addShippingMulti, addShippingSingle } from './state'

import Navbar from './scenes/global/Navbar'
import Home from './scenes/home/Home'
import CartMenu from './scenes/global/CartMenu'
import ShoppingList from './scenes/home/ShoppingList'
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

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
    const checkoutToken = useSelector((state) => state.cart.checkoutToken)

  const fetchItems = async() => {
    const {data} = await commerce.products.list()
    dispatch(setItems(data))
  }

  useEffect(() => {
    fetchItems()
  })

      const generateToken = async () => {
    await commerce.cart.empty()
    await cart.forEach((item) => commerce.cart.add(item.id, item.count))    
    const comCart = await commerce.cart.retrieve()
    try {
    const token = await commerce.checkout.generateToken(comCart.id, { type: 'cart' })
    dispatch(addToken({checkoutToken: token})) 
    console.log(token);

   const {countries} = await commerce.services.localeListShippingCountries(token.id)        
            dispatch(addShippingMulti({countries: countries}))
            dispatch(addShippingSingle({country: Object.keys(countries)[0]})) 
            let countryCode = Object.keys(countries)[0]

    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)        
            dispatch(addShippingMulti({subs: subdivisions}))
            dispatch(addShippingSingle({sub: Object.keys(subdivisions)[0]}))
            let subdivision = Object.keys(subdivisions)[0]

    const options = await commerce.checkout.getShippingOptions(token.id, { country: countryCode, region: subdivision })        
            dispatch(addShippingMulti({options: options}))
            dispatch(addShippingSingle({option: options[0].id}))

    } catch(error) {
          console.log(error);
    }
  }

  useEffect(() => {
    generateToken()
  }, [cart])

  console.log(checkoutToken);

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
          <Route path='/shopping' element={<ShoppingList/>}/>
          <Route path='/item/:itemId' element={<ItemDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
        <CartMenu generateToken={generateToken}/>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App

