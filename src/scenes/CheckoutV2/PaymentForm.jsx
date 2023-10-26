import React from 'react'
import { Typography, Button, Divider } from '@mui/material'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_pUBLIC_KEY )

const PaymentForm = ({checkoutToken, shippingData, prevStep, onCaptureCheckout, nextStep }) => {

    console.log(shippingData);

    const handleSubmit = async(e, elements, stripe) => {
     e.preventDefault()

     if(!stripe || !elements) return

     const cardElement = elements.getElement(CardElement)

     const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})
     console.log(paymentMethod);
 
     if(error) {
        console.log(error);
     } else {
        console.log(shippingData);
        const orderData = {
            line_items: checkoutToken.line_items,
            customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
            shipping: {
                name: 'Primary', 
                street: shippingData.address1,
                town_city: shippingData.city,
                country_state: shippingData.shippingSubdivision,
                postal_zip_code: shippingData.zip,
                country: shippingData.shippingCountry
            },
            fulfillment: { shipping_method: shippingData.shippingOption},
            payment: {
                gateway: 'stripe',
                stripe: {
                    payment_method_id: paymentMethod.id
                }
            }
        }
        onCaptureCheckout(checkoutToken.id, orderData)
        nextStep()
     }
    }

  return (
    <>
        <Review checkoutToken={checkoutToken}></Review>
        <Divider/>
        <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment Method</Typography>
        <Elements stripe={stripePromise }>
            <ElementsConsumer>
                {({elements, stripe}) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement/>
                        <br/><br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button 
                            fullWidth 
                            variant='contained' 
                            color='primary'
                            sx={{
                                backgroundColor: "#999999",
                                boxShadow: 'none',
                                color: 'white',
                                borderRadius: 0,
                                padding: '15px 40px',
                                marginRight: '5px'
                                }}
                            onClick={prevStep}
                            >Back</Button>
                            <Button 
                            type='Submit' 
                            fullWidth 
                            variant='contained' 
                            color='primary'
                            sx={{
                                backgroundColor: "#999999",
                                boxShadow: 'none',
                                color: 'white',
                                borderRadius: 0,
                                padding: '15px 40px',
                                marginLeft: '5px'
                                }}
                            >
                                Pay {checkoutToken?.subtotal.formatted_with_symbol}
                            </Button>
                        </div>
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
    </>
  )
}

export default PaymentForm
