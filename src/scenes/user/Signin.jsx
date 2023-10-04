import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, getIn } from 'formik'
import * as yup from 'yup'
import { setIsSignedIn} from '../../state'

const initialValues = {
  email: '',
  password: ''
}

const Signin = () => {
const navigate = useNavigate()
const dispatch = useDispatch() 
const users = useSelector((state) => state.cart.users)  

const signInSchema = yup.object().shape({
      email: yup.string().required('required'),
      password: yup.string().required('required')  
  })

const handleSubmit = (values) => {
    if(values.email !== '' && values.password !== '') {
        if(users[0].email === values.email && users[0].password === values.password) {
            dispatch(setIsSignedIn({}))          
            navigate('/')
        }        
    }
}

  return (
    <Box width='80%' m='10% auto'  >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signInSchema}
      >
        {({
          values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
        }) =>{ 
          const formattedError = (field) => {
            Boolean(
              getIn(touched, field &&
              getIn(errors, field))
            )}

        return(
          <form onSubmit={handleSubmit}>
            <Typography sx={{mb: '15px'}} fontSize='18px'>Sign In</Typography>
            <Box
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(2, minmax(0, 1fr))'
            sx={{gridColumn: 'span 2'}}
            >
            <TextField
              fullWidth
              type='text'
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
              error={formattedError('email')}
              sx={{gridColumn: 'span 2'}}
            />

            <TextField
              fullWidth
              type='password'
              label='Password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={formattedError('password')}
              sx={{gridColumn: 'span 2'}}
            />

            <Button 
              variant='contained' 
              color='secondary' 
              sx={{height: '50px', gridColumn: 'span 1'}}
              onClick={() => navigate('/register')}
          >Register</Button>

            <Button 
              type='submit' 
              variant='contained' 
              color='primary' 
              sx={{height: '50px', gridColumn: 'span 1'}}
          >Sign In</Button>
          </Box>
          </form>
        )}}
      </Formik>
    </Box>
  )
}

export default Signin
