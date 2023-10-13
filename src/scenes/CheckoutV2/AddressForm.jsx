import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'

const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdevisions, setShippingSubdevisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name})) 
    const subdivisions = Object.entries(shippingSubdevisions).map(([code, name]) => ({ id: code, label: name})) 
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    // console.log(options);

    const fetchShippinCountries = async(checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        setShippingCountry((Object.keys(countries)[0]))        
    }

    const fetchShippingSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdevisions(subdivisions)
        setShippingSubdivision((Object.keys(subdivisions)[0]))
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        console.log(options);
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippinCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        shippingCountry && fetchShippingSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        shippingSubdivision && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
            <Grid container spacing={3}>
                <FormInput name='firstName' label='First Name'/>
                <FormInput name='lastName' label='Last Name'/>
                <FormInput name='address1' label='Address'/>
                <FormInput name='email' label='Email'/>
                <FormInput name='city' label='City'/>
                <FormInput name='zip' label='ZIP / Postal code'/>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        {countries && countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                            {country.label}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                        {subdivisions && subdivisions.map((subdivision) => (
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.label}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
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
                <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                <Button type='submit' variant='contained' color='primary'>Next</Button>
            </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
