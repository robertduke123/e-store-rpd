import React from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'
import { useDispatch, useSelector } from 'react-redux'
import { addShippingMulti, addShippingSingle } from '../../state'

const AddressForm = ({checkoutToken, next}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.cart.user)
    const isSignedIn = useSelector((state) => state.cart.isSignedIn)

    const shippingCountries = useSelector((state) => state.cart.shippingMulti.countries)    
    const shippingSubdevisions = useSelector((state) => state.cart.shippingMulti.subs)
    const shippingOptions = useSelector((state) => state.cart.shippingMulti.options)
    const shippingCountry = useSelector((state) => state.cart.shippingSingle.country)    
    const shippingSubdivision = useSelector((state) => state.cart.shippingSingle.sub)
    const shippingOption = useSelector((state) => state.cart.shippingSingle.option)
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name})) 
    const subdivisions = Object.entries(shippingSubdevisions).map(([code, name]) => ({ id: code, label: name})) 
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

   

    const fetchShippingSubdivisions = async (checkoutTokenId ,countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)        
            dispatch(addShippingMulti({subs: subdivisions}))
            dispatch(addShippingSingle({sub: Object.keys(subdivisions)[0]}))
            let subdivision = Object.keys(subdivisions)[0]

    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country: countryCode, region: subdivision })        
            dispatch(addShippingMulti({options: options}))
            dispatch(addShippingSingle({option: options[0].id}))
        // setShippingSubdevisions(subdivisions)
        // setShippingSubdivision((Object.keys(subdivisions)[0]))
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        // console.log(options);        
        dispatch(addShippingMulti({options: options}))
        dispatch(addShippingSingle({option: options[0].id}))
        // setShippingOptions(options)
        // setShippingOption(options[0].id)
    }

    // useEffect(() => {
    //     fetchShippinCountries(checkoutToken?.id)
    // }, [checkoutToken])

    // useEffect(() => {
    //     shippingCountry && fetchShippingSubdivisions(shippingCountry)
    // }, [shippingCountry])

    // useEffect(() => {
    //     shippingSubdivision && fetchShippingOptions(checkoutToken?.id, shippingCountry, shippingSubdivision)
    // }, [shippingSubdivision])

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
            <Grid container spacing={3}>
                <FormInput name='firstName' label='First Name' value={isSignedIn && user?.first_name}/>
                <FormInput name='lastName' label='Last Name' value={isSignedIn && user?.last_name}/>
                <FormInput name='address1' label='Address' value={isSignedIn && user?.address}/>
                <FormInput name='email' label='Email' value={isSignedIn && user?.email}/>
                <FormInput name='city' label='City' value={isSignedIn && user?.city}/>
                <FormInput name='zip' label='ZIP / Postal code' value={isSignedIn && user?.zip}/>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e) => {
                        dispatch(addShippingSingle({country: e.target.value}))
                        console.log(e.target.value);
                        fetchShippingSubdivisions(checkoutToken?.id, e.target.value)
                        }}>
                        {countries && countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                            {country.label}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select value={shippingSubdivision} fullWidth onChange={(e) => {
                        dispatch(addShippingSingle({sub: e.target.value}))
                        fetchShippingOptions(checkoutToken?.id, shippingCountry, e.target.value)
                        }}>
                        {subdivisions && subdivisions.map((subdivision) => (
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.label}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e) => dispatch(addShippingSingle({option: e.target.value}))}>
                        {options && options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <br/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                type='submit' 
                fullWidth 
                variant='contained' 
                color='primary'
                sx={{
                      backgroundColor: "#999999",
                      boxShadow: 'none',
                      color: 'white',
                      borderRadius: 0,
                      padding: '15px 40px'
                    }}
                >Next</Button>
            </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
