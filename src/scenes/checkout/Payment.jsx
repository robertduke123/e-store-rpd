import React from 'react'
import { Typography, Button, Box, Divider } from '@mui/material'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { commerce } from '../../lib/commerce'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_pUBLIC_KEY )

const Payment = ({checkoutToken, values, activeStep, setActiveStep, handleCaptureCheckout}) => {

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        console.log(options);
    }


    const handleSubmit = async(e, elements, stripe) => {

     e.preventDefault()

     fetchShippingOptions(checkoutToken.id, 'nz', 'Auckland')

     if(!stripe || !elements) return

     const cardElement = elements.getElement(CardElement)

     const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})
     console.log(paymentMethod);
     

     if(error) {
        console.log(error);
     } else {
        const orderData = {
            line_items: checkoutToken?.line_items,
            customer: {firstname: values.billingAddress.firstName, lastname: values.billingAddress.lastName, email: values.email},
            shipping: {
                name: 'Primary', 
                street: values.shippingAddress.street1,
                town_city: values.shippingAddress.city,
                country_state: values.shippingAddress.state,
                postal_zip_code: values.shippingAddress.zip,
                country: 'NZ'
            },
            fulfillment: { shipping_method: 'international'},
            payment: {
                gateway: 'stripe',
                stripe: {
                    payment_method_id: paymentMethod.id
                }
            }
        }
        console.log(orderData);
        // handleCaptureCheckout(checkoutToken?.id, orderData)
    }
     }
    console.log(values);
  return (
    <div>
       <Typography sx={{mb: '15px'}} fontSize='18px'>Billing Information</Typography>
        <Elements stripe={stripePromise }>
            <ElementsConsumer>
                {({elements, stripe}) => (
                    <form>
                        <CardElement/>
                        <br/><br/>
                        <Box display='flex' justifyContent='space-between' gap='50px'>
                            <Button
                                fullWidth
                                color='primary'
                                variant='contained'
                                sx={{
                                backgroundColor: "#999999",
                                boxShadow: 'none',
                                color: 'white',
                                borderRadius: 0,
                                padding: '15px 40px'
                                }}
                                onClick={() => setActiveStep(activeStep - 1)}
                            >BACK</Button>
                            <Button 
                                type='Submit' 
                                disabled={!stripe} 
                                fullWidth
                                color='primary'
                                variant='contained'
                                sx={{
                                backgroundColor: "#999999",
                                boxShadow: 'none',
                                color: 'white',
                                borderRadius: 0,
                                padding: '15px 40px'
                                }}
                                onClick={(e) => handleSubmit(e, elements, stripe)}
                                >Pay {checkoutToken?.subtotal.formatted_with_symbol}
                                </Button>
                       </Box>
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
    </div>
  )
}

export default Payment
