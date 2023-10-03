import React, {useState} from 'react'
import { Box, useMediaQuery, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { onRegisterUser, setIsSignedIn } from '../../state'

const Register = () => {
const isNonMobile = useMediaQuery('(min-width: 200px)')
const navigate = useNavigate()
const dispatch = useDispatch()
const [registerUser, setRegisterUser] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress1: '',
  city: '',
  country: '',
  state: '',
  zipCode: '',
  password: ''
})
const [streetAddress2, setStreetAddress2] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')

const [errorFirst, setErrorFirst] = useState(false)
const [errorSecond, setErrorSecond] = useState(false)
const [errorEmail, setErrorEmail] = useState(false)
const [errorPhone, setErrorPhone] = useState(false)
const [errorStreet1, setErrorStreet1] = useState(false)
const [errorCity, setErrorCity] = useState(false)
const [errorCountry, setErrorCountry] = useState(false)
const [errorState, setErrorState] = useState(false)
const [errorZip, setErrorZip] = useState(false)
const [errorPassword, setErrorPassword] = useState(false)
const [errorConPassword, setErrorConPassword] = useState(false)

const handleSubmit = () => {
  let count = 0
  Object.entries(registerUser).forEach((entry) => {
    entry[1] !== '' && count++
  })
  registerUser.firstName === '' ? setErrorFirst(true) : setErrorFirst(false)
  registerUser.lastName === '' ? setErrorSecond(true) : setErrorSecond(false)
  registerUser.email === '' ? setErrorEmail(true) : setErrorEmail(false)
  registerUser.phone === '' ? setErrorPhone(true) : setErrorPhone(false)
  registerUser.streetAddress1 === '' ? setErrorStreet1(true) : setErrorStreet1(false)
  registerUser.city === '' ? setErrorCity(true) : setErrorCity(false)
  registerUser.country === '' ? setErrorCountry(true) : setErrorCountry(false)
  registerUser.state === '' ? setErrorState(true) : setErrorState(false)
  registerUser.zipCode === '' ? setErrorZip(true) : setErrorZip(false)
  registerUser.password === '' ? setErrorPassword(true) : setErrorPassword(false)
  confirmPassword === '' ? setErrorConPassword(true) : setErrorConPassword(false)

  if(count === 10 && registerUser.password === confirmPassword) {
    console.log('registered!!!');
    dispatch(onRegisterUser({...registerUser, streetAddress2}))
    dispatch( setIsSignedIn({}))
    navigate('/')
  }
}

  return (
    <Box
        width='800px'
        margin='100px auto'
        display='grid'
        gap='15px'
        gridTemplateColumns='repeat(2, minmax(0, 1fr))'
        sx={{'& > div': {gridColumn: isNonMobile ? undefined : 'span 2'}}}
    >
      <TextField
        fullWidth
        typeof='text'
        label='First Name'
        required
        onChange={(e) => setRegisterUser({...registerUser, firstName: e.target.value})}
        error={errorFirst ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Last Name'
        required
        onChange={(e) => setRegisterUser({...registerUser, lastName: e.target.value})}
        error={errorSecond ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Email'
        onChange
        required={(e) => setRegisterUser({...registerUser, email: e.target.value})}
        error={errorEmail ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Phone Number'
        required
        onChange={(e) => setRegisterUser({...registerUser, phone: e.target.value})}
        error={errorPhone ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Street Address 1'
        required
        onChange={(e) => setRegisterUser({...registerUser, streetAddress1: e.target.value})}
        error={errorStreet1 ? true : false}
        sx={{gridColumn: 'span 2'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Street Address 2 (optional)'
        onChange={(e) => setStreetAddress2(e.target.value)}
        sx={{gridColumn: 'span 2'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='City'
        onChange
        required={(e) => setRegisterUser({...registerUser, city: e.target.value})}
        error={errorCity ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Country'
        onChange
        required={(e) => setRegisterUser({...registerUser, country: e.target.value})}
        error={errorCountry ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='State'
        onChange
        required={(e) => setRegisterUser({...registerUser, state: e.target.value})}
        error={errorState ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        typeof='text'
        label='Zip Code'
        required
        onChange={(e) => setRegisterUser({...registerUser, zipCode: e.target.value})}
        error={errorZip ? true : false}
        sx={{gridColumn: 'span 1'}}
      />

      <TextField
        fullWidth
        type='password'
        label='Password'
        onChange
        required={(e) => setRegisterUser({...registerUser, password: e.target.value})}
        error={errorPassword ? true : false}
        sx={{gridColumn: 'span 2'}}
      />

      <TextField
        fullWidth
        type='password'
        label='Confirm Password'
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errorConPassword ? true : false}
        sx={{gridColumn: 'span 2'}}
      />

      <Button 
        type='submit' 
        variant='contained' 
        color='error' 
        sx={{height: '50px', gridColumn: 'span 1'}}
        onClick={() => navigate('/signin')}
    >Back</Button>

      <Button 
        type='submit' 
        variant='contained' 
        color='primary' 
        sx={{height: '50px', gridColumn: 'span 1'}}
        onClick={handleSubmit}
    >Register</Button>
    </Box>
  )
}

export default Register
