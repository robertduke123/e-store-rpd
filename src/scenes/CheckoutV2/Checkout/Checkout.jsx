import React, { useState } from 'react'
import { Stepper, Step, StepLabel,Typography, CircularProgress, Divider, Button, Box } from '@mui/material'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../../state'
import { useNavigate } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
    const checkoutToken = useSelector((state) =>  state.cart.checkoutToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const [ shippingData, setShippingData ] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [isFinished, setIsFinished] = useState(false)

    // console.log(checkoutToken);

    // useEffect(() => {
    //     generateToken()
    //     console.log(checkoutToken);
    // }, [])

    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
        console.log(incomingOrder);
      setOrder(incomingOrder)
      commerce.cart.refresh()
        dispatch(emptyCart({}))
    } catch(error) {
      setErrorMessage(error.data.error.message)
    }
  }

    const nextStep = () => setActiveStep((prevState) => prevState + 1)
    const prevStep = () => setActiveStep((prevState) => prevState - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    } 

  return (
        
      <Box width='80%' m='10% auto'>
            <Typography variant='h4' align='center'>Checkout</Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((step => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )))}
            </Stepper>
            {activeStep === steps.length ?
            order.customer ?
            errorMessage ? 
                <>
                    <Typography variant='h5'>Error: {errorMessage}</Typography>
                    <br/>
                    <Button 
                    onClick={() => navigate('/')} 
                    type='button'                    
                    variant='contained' 
                    color='primary'
                    sx={{
                        backgroundColor: "#999999",
                        boxShadow: 'none',
                        color: 'white',
                        borderRadius: 0,
                        padding: '15px 40px'
                        }}
                    >Back to Home</Button>
                </> :                
                isFinished ? 
                <>
                    <div style={{padding: '15px'}}>
                        <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                        <Divider/>
                        <Typography marginTop='10px'>Order ref : {order.customer_reference}</Typography>
                    </div>
                    <br/>
                    <Button 
                    onClick={() => navigate('/')} 
                    type='button'
                    variant='contained' 
                    color='primary'
                    sx={{
                        backgroundColor: "#999999",
                        boxShadow: 'none',
                        color: 'white',
                        borderRadius: 0,
                        padding: '15px 40px'
                        }}
                    >Back to Home</Button>
                </> :
                <div>
                    <CircularProgress/>
                </div> :
                 <>
                    <div style={{padding: '15px'}}>
                        <Typography variant='h5' >Thank you for your purchase</Typography>
                        <Divider/>
                    </div>
                    <br/>
                    <Button 
                    onClick={() => navigate('/')} 
                    type='button'
                    variant='contained' 
                    color='primary'
                    sx={{
                        backgroundColor: "#999999",
                        boxShadow: 'none',
                        color: 'white',
                        borderRadius: 0,
                        padding: '15px 40px'
                        }}
                    >Back to Home</Button>
                </> :
                activeStep === 0 ?
                <AddressForm
                 checkoutToken={checkoutToken !== null && checkoutToken} 
                 next={next}/> :
                <PaymentForm 
                checkoutToken={checkoutToken !== null && checkoutToken} 
                shippingData={shippingData} 
                prevStep={prevStep}
                onCaptureCheckout={handleCaptureCheckout}
                nextStep={nextStep}
                timeout={timeout}
                />
            }
      </Box>
    
  )
}

export default Checkout
