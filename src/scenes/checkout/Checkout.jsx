import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
// import { shades } from '../../theme'
// import {loadStripe } from '@stripe/stripe-js'
// import Payment from './Payment'
import Shipping from './Shipping'

const initialValues = {
    billingAddress: {
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: ''
    },
    email: '',
    phoneNumber: ''
}

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required('required'),
      lastName: yup.string().required('required'),
      country: yup.string().required('required'),
      street1: yup.string().required('required'),
      street2: yup.string(),
      city: yup.string().required('required'),
      state: yup.string().required('required'),
      zip: yup.string().required('required')
    }),
    shippingAddress: yup.object().shape({
    isSameAddress: yup.boolean(),
    firstName: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    lastName: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    country: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    street1: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    street2: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string()
    }),
    city: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    state: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    zip: yup.string().when('isSameAddress', {
      is: false,
      then: () => yup.string().required('required')
    })
  })
  }),
  yup.object().shape({
    email: yup.string().required('required'),
    phoneNumber: yup.string().required('required')
  })
]

const Checkout = () => {

  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector((state) => state.cart.cart)  
  const user = useSelector((state) => state.cart.users[0])
  const isSignedIn = useSelector((state) => state.cart.isSignedIn)
  const isFirstStep = activeStep === 0
  const isSecondStep = activeStep === 1

  const onLoad = async() => {
    if(isSignedIn){
        initialValues.billingAddress.firstName = user.firstName
        initialValues.billingAddress.lastName = user.lastName
        initialValues.billingAddress.country = user.streetAddress1
        initialValues.billingAddress.street1 = user.streetAddress2
        initialValues.billingAddress.street2 = user.city
        initialValues.billingAddress.city = user.country
        initialValues.billingAddress.state = user.state
        initialValues.billingAddress.zipCode = user.zipCode
        initialValues.shippingAddress.firstName = user.firstName
        initialValues.shippingAddress.lastName = user.lastName
        initialValues.shippingAddress.country = user.streetAddress1
        initialValues.shippingAddress.street1 = user.streetAddress2
        initialValues.shippingAddress.street2 = user.city
        initialValues.shippingAddress.city = user.country
        initialValues.shippingAddress.state = user.state
        initialValues.shippingAddress.zipCode = user.zipCode
        initialValues.email = user.email
        initialValues.phoneNumber = user.phone

        setActiveStep(1)
    }
  }  

    useEffect(() => {
        onLoad()
    }, [])


  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1)
    console.log('test');
    if(isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true
      })
      // console.log(values);
    }
    //   if(isSecondStep) {
    //     makePayment(values)
    //   }

    //   actions.setTouched({})
    // }
  }


  return (
    <Box width='80%' m='10% auto'>
      <Stepper activeStep={activeStep} sx={{m: '20px 0'}}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => {
            // console.log(values);
            return(
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {/* {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )} */}
              <Box display='flex' justifyContent='space-between' gap='50px'>
                {isSecondStep && (
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
                )}
                  <Button
                    fullWidth
                    type='submit'
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: "#999999",
                      boxShadow: 'none',
                      color: 'white',
                      borderRadius: 0,
                      padding: '15px 40px'
                    }}
                    // onClick={() => setActiveStep(activeStep + 1)}
                  >{isFirstStep? 'NEXT' : 'PLACE ORDER'}</Button>
              </Box>
            </form>
          )}}
        </Formik>
      </Box>
    </Box>
  )
}

export default Checkout
