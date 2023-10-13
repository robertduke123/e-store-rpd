import React from 'react'
import { Box, TextField, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, getIn} from 'formik'
import * as yup from 'yup'
import { onRegisterUser, setIsSignedIn } from '../../state'

const initialValues = {
  registerUser: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '', 
    skipAddress: false,
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    country: '',
    state: '',
    zip: '',
    password: ''
  },
  confirmPassword: ''
}

const registerSchema = yup.object().shape({
  registerUser: yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().required('required'),
    phone: yup.string().required('required'),
    skipAddress: yup.boolean(),
    streetAddress1: yup.string().when('skipAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    streetAddress2: yup.string().when('skipAddress', {
      is: false,
      then: () => yup.string()
    }),
    city: yup.string().when('skipAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    country: yup.string().when('skipAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    state: yup.string().when('skipAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    zip: yup.string().when('skipAddress', {
      is: false,
      then: () => yup.string().required('required')
    }),
    password: yup.string().required('required')
  }),
  confirmPassword: yup.string().required('required')
})

const Register = () => {
const users = useSelector((state) => state.cart.users)
const navigate = useNavigate()
const dispatch = useDispatch()


const handleSubmit = (values) => {

  if(values.registerUser.password === values.confirmPassword) {
    dispatch(onRegisterUser(values.registerUser))
    dispatch( setIsSignedIn({}))
    navigate('/')
  }
}

  return (
    <Box width='80%' m='10% auto'  >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) =>{ 
          const formattedError = (field) =>  Boolean(getIn(touched, field)) &&  getIn(errors, field)

          const formattedHelper = (field) => getIn(touched, field) && getIn(errors, field)
          return(
            <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(2, minmax(0, 1fr))'
              sx={{gridColumn: 'span 2'}}
            >
              <TextField
                fullWidth
                typeof='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.firstName}
                name='registerUser.firstName'
                error={formattedError('registerUser.firstName')}
                helperText={formattedHelper('registerUser.firstName')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.lastName}
                name='registerUser.lastName'
                error={formattedError('registerUser.lastName')}
                helperText={formattedHelper('registerUser.lastName')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.email}
                name='registerUser.email'
                error={formattedError('registerUser.email')}
                helperText={formattedHelper('registerUser.email')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Phone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.phone}
                name='registerUser.phone'
                error={formattedError('registerUser.phone')}
                helperText={formattedHelper('registerUser.phone')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                type='password'
                label='Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.password}
                name='registerUser.password'
                error={formattedError('registerUser.password')}
                helperText={formattedHelper('registerUser.password')}
                sx={{gridColumn: 'span 2'}}
              />

              <TextField
                fullWidth
                type='password'
                label='Confirm Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name='confirmPassword'
                error={formattedError('confirmPassword')}
                helperText={formattedHelper('confirmPassword')}
                sx={{gridColumn: 'span 2'}}
              /> 

              <Box mb='20px' sx={{gridColumn: 'span 2'}}>
                <FormControlLabel
                label='Skip Address Details'
                control={
                    <Checkbox
                        checked={values.registerUser.skipAddress}
                        onChange={() => setFieldValue('registerUser.skipAddress', !values.registerUser.skipAddress)}
                    />
                }
                />
              </Box> 
              {!values.registerUser.skipAddress && (
              <div style={{gridColumn: 'span 2', display: 'grid', gap:'15px', gridTemplateColumns:'repeat(2, minmax(0, 1fr))'}}> 
              <TextField
                fullWidth
                typeof='text'
                label='Street Address 1'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.streetAddress1}
                name='registerUser.streetAddress1'
                error={formattedError('registerUser.streetAddress1')}
                helperText={formattedHelper('registerUser.streetAddress1')}
                sx={{gridColumn: 'span 2'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Street Address 2 (optional)'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.streetAddress2}
                name='registerUser.streetAddress2'
                error={formattedError('registerUser.streetAddress2')}
                helperText={formattedHelper('registerUser.streetAddress2')}
                sx={{gridColumn: 'span 2'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='City'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.city}
                name='registerUser.city'
                error={formattedError('registerUser.city')}
                helperText={formattedHelper('registerUser.city')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Country'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.country}
                name='registerUser.country'
                error={formattedError('registerUser.country')}
                helperText={formattedHelper('registerUser.country')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='State'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.state}
                name='registerUser.state'
                error={formattedError('registerUser.state')}
                helperText={formattedHelper('registerUser.state')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Zip Code'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registerUser.zip}
                name='registerUser.zip'
                error={formattedError('registerUser.zip')}
                helperText={formattedHelper('registerUser.zip')}
                sx={{gridColumn: 'span 1'}}
              />             
              </div>
              )}

              <Button 
                type='submit' 
                variant='contained' 
                color='error' 
                sx={{
                        height: '50px', 
                        gridColumn: 'span 1',
                        backgroundColor: "#999999",
                        boxShadow: 'none',
                        color: 'white',
                        borderRadius: 0,
                        padding: '15px 40px'
                      }}
                onClick={() => navigate('/signin')}
            >Back</Button>

              <Button 
                type='submit' 
                variant='contained' 
                color='primary' 
                sx={{
                        height: '50px', 
                        gridColumn: 'span 1',
                        backgroundColor: "#999999",
                        boxShadow: 'none',
                        color: 'white',
                        borderRadius: 0,
                        padding: '15px 40px'
                      }}
                onClick={handleSubmit}
            >Register</Button>
            </Box>
            </form>            
          )
        }}
      </Formik>
    </Box>
  )
}

export default Register
