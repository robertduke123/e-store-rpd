import React, {useState} from 'react'
import { Box, Typography,TextField, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Formik, getIn} from 'formik'
import { editUser, setUser } from '../../state'

const initialValues = {
  profileUser: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  },
  profilePassword: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

const editProfileSchema = [yup.object().shape({
  profileUser: yup.object().shape({
    first_name: yup.string().required('required'),
    last_name: yup.string().required('required'),
    email: yup.string().required('required'),
    phone: yup.string().required('required'),
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
  })
}),
yup.object().shape({
  profilePassword: yup.object().shape({
    oldPassword: yup.string().required('required'),
    newPassword: yup.string().required('required'),
    confirmPassword: yup.string().required('required')
  })
})]

const Profile = () => {
    const user = useSelector((state) => state.cart.user)
    const dispatch = useDispatch()
    const [profileRoute, setProfileRoute] = useState('details')

const editProfile = () => {
  initialValues.profileUser.first_name = user.first_name
  initialValues.profileUser.last_name = user.last_name
  initialValues.profileUser.email = user.email
  initialValues.profileUser.phone = user.phone
  initialValues.profileUser.address = user.address
  initialValues.profileUser.city = user.city
  initialValues.profileUser.zip = user.zip

  setProfileRoute('editDetails')
}


 const handleSubmit = (values) => {
  if(profileRoute === 'editDetails') {
    //  dispatch(editUser({user: {...user, ...values.profileUser}})) 
      fetch('http://localhost:3000/edit_user', {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: user.id,
            newFirst: values.profileUser.first_name, 
            newLast: values.profileUser.last_name,
            newEmail: values.profileUser.email,
            newPhone: values.profileUser.phone,
            newAddress: values.profileUser.address,
            newCity: values.profileUser.city,
            newZip: values.profileUser.zip
          })
        })
        .then(response => response.json())
        .then(data => {
          dispatch(setUser({user: data}))
          console.log(data);    
        })
    } else {
     if(values.profilePassword.oldPassword === user.password && values.profilePassword.newPassword === values.profilePassword.confirmPassword){
      let password = values.profilePassword.confirmPassword
     dispatch(editUser({user: {...user, password}}))
    }
  }
    setProfileRoute('details')
 }


  return (
    profileRoute === 'details' ? (
      <Box width='80%' m='10% auto' padding='0 10%' display='flex' justifyContent='space-around'>
            <Box
            padding='45px'
            borderRadius='8px'
            boxShadow='.5px .5px 5px gray'
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(1, 1fr)'
            >
              <Typography variant='h4' gridColumn='span 2'>Account Overview</Typography>
              
              <Typography m='8px' sx={{fontWeight: 'bold'}} gridColumn='span 1'>Name:</Typography>
              <Typography m='8px' gridColumn='span 1'>{user?.first_name + ' ' + user?.last_name}</Typography>
          
          
              <Typography m='8px' sx={{fontWeight: 'bold'}} gridColumn='span 1'>Email:</Typography>
              <Typography m='8px' gridColumn='span 1'>{user?.email}</Typography>
          
              <Typography m='8px' sx={{fontWeight: 'bold'}} gridColumn='span 1'>Phone:</Typography>
              <Typography m='8px' gridColumn='span 1'>{user?.phone}</Typography>
          
              <Typography m='8px' sx={{fontWeight: 'bold'}} gridColumn='span 1'>Address:</Typography>
              <Box m='8px' gridColumn='span 1'>
                  <Typography>{user?.address}</Typography>
                  <Typography>{user?.city}</Typography>
                  <Typography>{user?.zip}</Typography>           
              </Box>
            </Box>

            <Box 
            width='250px'
            height='150px'
            borderRadius='8px'
            display='flex' 
            flexDirection='column'
            justifyContent='center'
            sx={{backgroundColor: 'lightblue'}}
            >
              <Button onClick={editProfile}>Edit Account Details</Button>
              <Button onClick={() => setProfileRoute('editPassword')}>Change Password</Button>
            </Box>      
          </Box>
    ) :
    profileRoute === 'editDetails' ? 
    (
      <Box width='80%' m='10% auto'  >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={editProfileSchema[0]} 
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) =>{ 
          console.log(values);

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
              <Typography variant='h4' gridColumn='span 2'>Edit Details</Typography>
              <TextField
                fullWidth
                typeof='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.first_name}
                name='profileUser.first_name'
                error={formattedError('profileUser.first_name')}
                helperText={formattedHelper('profileUser.first_name')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.last_name}
                name='profileUser.last_name'
                error={formattedError('profileUser.last_name')}
                helperText={formattedHelper('profileUser.last_name')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.email}
                name='profileUser.email'
                error={formattedError('profileUser.email')}
                helperText={formattedHelper('profileUser.email')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Phone Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.phone}
                name='profileUser.phone'
                error={formattedError('profileUser.phone')}
                helperText={formattedHelper('profileUser.phone')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Street Address'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.address}
                name='profileUser.address'
                error={formattedError('profileUser.address')}
                helperText={formattedHelper('profileUser.address')}
                sx={{gridColumn: 'span 2'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='City'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.city}
                name='profileUser.city'
                error={formattedError('profileUser.city')}
                helperText={formattedHelper('profileUser.city')}
                sx={{gridColumn: 'span 1'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='Zip Code'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profileUser.zip}
                name='profileUser.zip'
                error={formattedError('profileUser.zip')}
                helperText={formattedHelper('profileUser.zip')}
                sx={{gridColumn: 'span 1'}}
              />  

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
                onClick={() => setProfileRoute('details')}
            >Back</Button>

              <Button 
                // type='submit' 
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
            >Save</Button>
            </Box>
            </form>            
          )
        }}
      </Formik>
    </Box>
    ) :
    (
      <Box width='80%' m='10% auto'  >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={editProfileSchema[1]}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) =>{ 
          console.log(values);

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
              <Typography variant='h4' gridColumn='span 2'>Edit Details</Typography>
              <TextField
                fullWidth
                 type='password'
                label='Old Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profilePassword.oldPassword}
                name='profilePassword.oldPassword'
                error={formattedError('profilePassword.oldPassword')}
                helperText={formattedHelper('profilePassword.oldPassword')}
                sx={{gridColumn: 'span 2'}}
              />

              <TextField
                fullWidth
                typeof='text'
                label='New Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profilePassword.newPassword}
                name='profilePassword.newPassword'
                error={formattedError('profilePassword.newPassword')}
                helperText={formattedHelper('profilePassword.newPassword')}
                sx={{gridColumn: 'span 2'}}
              /> 

              <TextField
                fullWidth
                 type='password'
                label='Confirm Password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profilePassword.confirmPassword}
                name='profilePassword.confirmPassword'
                error={formattedError('profilePassword.confirmPassword')}
                helperText={formattedHelper('profilePassword.confirmPassword')}
                sx={{gridColumn: 'span 2'}}
              /> 

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
                onClick={() => setProfileRoute('details')}
            >Back</Button>

              <Button 
                // type='submit' 
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
            >Save</Button>
            </Box>
            </form>            
          )
        }}
      </Formik>
    </Box>
    )
    
  )
}

export default Profile
