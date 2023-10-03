import React, {useState} from 'react'
import { Box, useMediaQuery, TextField, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsSignedIn} from '../../state'

const Signin = () => {
const isNonMobile = useMediaQuery('(min-width: 600px)')
const navigate = useNavigate()
const dispatch = useDispatch()
 
const users = useSelector((state) => state.cart.users)  
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errorEmail, setErrorEmail] = useState(false)
const [errorPassword, setErrorPassword] = useState(false)

const handleSubmit = () => {
    if(email !== '' && password !== '') {
        if(users[0].email === email && users[0].password === password) {
            dispatch(setIsSignedIn({}))          
            navigate('/')
        }        
        setErrorEmail(false)
        setErrorPassword(false)
    } else {
        email === '' ? setErrorEmail(true) : setErrorEmail(false)
        password === '' ? setErrorPassword(true) : setErrorPassword(false)      
    }
}

  return (
    <Box
        width='700px'
        height='300px'
        margin='100px auto'
        display='grid'
        gap='15px'
        gridTemplateColumns='repeat(2, minmax(0, 1fr))'
        sx={{gridColumn: isNonMobile ? undefined : 'span 2'}}
    >
      <TextField
        fullWidth
        type='text'
        label='Email'
        required
        error={errorEmail ? true : false}
        onChange={(e) => setEmail(e.target.value)}
        sx={{gridColumn: 'span 3'}}
      />

      <TextField
        fullWidth
        type='password'
        label='Password'
        required
        error={errorPassword ? true : false}
        onChange={(e) => setPassword(e.target.value)}
        sx={{gridColumn: 'span 3'}}
      />

      <Button 
        type='submit' 
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
        onClick={handleSubmit}
    >Sign In</Button>
    </Box>
  )
}

export default Signin
