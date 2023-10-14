import React from 'react'
import { Button, Box, Divider, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'
import { decreaseCount, increaseCount, removeFromCart, addToken, addShippingMulti, addShippingSingle ,setIsCartOpen } from '../../state'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {commerce} from '../../lib/commerce'

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CartMenu = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen)

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.price.formatted
    }, 0)

    const generateToken = async () => {
    const cart = await commerce.cart.retrieve()
    try {
    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
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

    const handleCart = async() => {    
    await commerce.cart.empty()
    await cart.forEach((item) => commerce.cart.add(item.id, item.count))
    await generateToken()
    }

  return (
    <Box //overlay 
        display={isCartOpen ? 'block' : 'none'}
        backgroundColor='rgba(0, 0, 0, 0.4)'
        position='fixed'
        zIndex={10}
        width='100%'
        height='100%'
        left='0'
        top='0'
        overflow='auto'
    >
      {/* MODAL */}
      <Box
        position='fixed'
        right='0'
        bottom='0'
        width='max(400px, 30%)'
        height='100%'
        backgroundColor='white'
      >
        <Box padding='30px' overflow='auto' height='100%'>
            {/* HEADER */}
            <FlexBox mb='15px'>
                <Typography variant='h5'>SHOPPING BAG ({cart.length})</Typography>
                <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                    <CloseIcon/>
                </IconButton>
            </FlexBox>

            {/* CART LIST */}
            <Box>
                {cart.length === 0 ? 
                <Typography m='50px 60px'>Fill Up The Cart To Checkout</Typography> :
                cart.map((item) => (
                    <Box key={`${item.name}-${item.id}`}>
                        <FlexBox p='15px 0'>
                            <Box flex='1 1 40%'>
                                <img
                                    alt={item?.name}
                                    width='123px'
                                    height='164px'
                                    src={item?.image.url}
                                    style={{objectFit: 'cover'}}
                                />
                            </Box>    
                            <Box flex='1 1 60%'>
                                {/* ITEM NAME */}
                                <FlexBox mb='5px'>
                                    <Typography fontWeight='bold'>
                                        {item.name}
                                    </Typography>
                                    <IconButton onClick={() => dispatch(removeFromCart({ id: item.id}))}>
                                        <CloseIcon/>
                                    </IconButton>
                                </FlexBox>
                                <Typography  dangerouslySetInnerHTML={{__html: item?.description}} />
                                {/* AMOUNT */}
                                <FlexBox m='15px 0'>
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        border={'1.5px solid #d6001c'}
                                    >
                                        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id}))}>
                                            <RemoveIcon/>
                                        </IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton onClick={() => dispatch(increaseCount({ id: item.id}))}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Box>
                                    {/* Price */}
                                <Typography fontWeight='bold'>{item.price.formatted_with_symbol}</Typography>
                                </FlexBox>
                            </Box>                
                        </FlexBox>
                        <Divider/>
                    </Box>
                ))}
            </Box>

            {/* ACTIONS */}
                <Box m='20px 0'>
                    <FlexBox m='20px 0'>
                        <Typography fontWeight='bold'>SUBTOTAL</Typography>
                        <Typography fontWeight='bold'>${totalPrice}</Typography>
                    </FlexBox>
                    <Button
                        sx={{
                            backgroundColor: "#333333",
                            color: 'white',
                            borderRadius: 0,
                            minWidth: '100%',
                            padding: '20px 40px',
                            m: '20px 0'
                        }}
                        onClick={() => {
                            if(cart.length > 0) { 
                            handleCart()                            
                            navigate('/checkout')
                            dispatch(setIsCartOpen({}))
                            }
                        }}
                    >CHECKOUT</Button>
                </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CartMenu
