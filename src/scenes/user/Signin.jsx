import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, getIn } from 'formik'
import * as yup from 'yup'
import { setIsSignedIn, setUser} from '../../state'

const initialValues = {
  email: '',
  password: ''
}

const signInSchema = yup.object().shape({
    email: yup.string().required('required'),
    password: yup.string().required('required')
  })


const Signin = () => {
const navigate = useNavigate()
const dispatch = useDispatch() 



const handleSubmit = (values) => {
    if(values.email !== '' && values.password !== '') {
        // if(users[0].email === values.email && users[0].password === values.password) {
        //     dispatch(setIsSignedIn({}))          
        //     navigate('/')
        // }  
        
        fetch(
          // 'http://localhost:3000/signin'
          'https://e-store-api-0tkm.onrender.com/signin'
        , {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        })
        .then(response => response.json())
        .then(data => {
          if(data.id) {
            dispatch(setUser({user: data})) 
            dispatch(setIsSignedIn({}))          
            navigate('/')
          }
          
        })

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
        }) => { 

          const formattedError = (field) =>  Boolean(getIn(touched, field)) &&  getIn(errors, field)

          const formattedHelper = (field) => getIn(touched, field) && getIn(errors, field)
          

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
              typeof='text'
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name='email'
              error={formattedError('email')}
              helperText={formattedHelper('email')}
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
              helperText={formattedHelper('password')}
              sx={{gridColumn: 'span 2'}}
            />

            <Button 
              variant='contained' 
              color='secondary' 
              sx={{
                height: '50px', 
                gridColumn: 'span 1',
                backgroundColor: "#999999",
                boxShadow: 'none',
                color: 'white',
                borderRadius: 0,
                padding: '15px 40px'
              }}
              onClick={() => navigate('/register')}
          >Register</Button>

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
          >Sign In</Button>
          </Box>
          </form>
        )}}
      </Formik>
    </Box>
  )
}

export default Signin
