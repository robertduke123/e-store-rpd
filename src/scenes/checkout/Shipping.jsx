import React from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, Typography } from '@mui/material'
import AddressForm from './AddressForm'

const Shipping = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    checkoutToken
}) => {
  return (
    <Box m='30px auto'>
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{mb: '15px'}} fontSize='18px'>Billing Information</Typography>
        <AddressForm
            type='billingAddress'
            values={values.billingAddress}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            checkoutToken={checkoutToken}
        />
      </Box>

      <Box mb='20px'>
        <FormControlLabel
        label='Same for Shipping Address'
        control={
            <Checkbox
                checked={values.shippingAddress.isSameAddress}
                onChange={() => setFieldValue('shippingAddress.isSameAddress', !values.shippingAddress.isSameAddress)}
            />
        }
        />
      </Box>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
            <Typography sx={{mb: '15px' }} fontSize='18px'>Shipping Information</Typography>
            <AddressForm
                type='shippingAddress'
                values={values.shippingAddress}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
            />
        </Box>
      )}
    </Box>
  )
}

export default Shipping
