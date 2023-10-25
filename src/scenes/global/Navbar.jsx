import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Badge, Box, IconButton, Typography, Button } from '@mui/material'
import { PersonOutline, ShoppingBagOutlined, SearchOutlined, HighlightOff } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { setIsCartOpen, setIsSignedIn } from '../../state'

const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    console.log(location);
  
    const isSignedIn = useSelector((state) => state.cart.isSignedIn)
    const items = useSelector((state) => state.cart.items)
    const cart = useSelector((state) => state.cart.cart)
    const [search, setSearch] = useState('hide')
    const [searchItem, setSearchItem] = useState('')
    const [filteredItems, setFilteredItems] = useState(items)
    const [profileBoxShow, setProfileBoxShow] = useState(false)

    const handleInputChange = (e) => { 
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)

      const filterItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredItems(filterItems);
    }


    // document.addEventListener('click', () => setSearch('hide'))

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      height='60px'
      backgroundColor='rgba(80, 80, 80,.95)'
      color='white'
      position='fixed'
      top='0'
      left='0'
      zIndex='1'
    >
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box
          onClick={() => navigate('/')}
          sx={{'&:hover': {cursor: 'pointer'}}}
          color="white"
        >
          Ecommerce
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          columnGap='20px'
          zIndex='2'
        >
          {search === 'show' ?
          <Box>
            <TextField variant='standard' type='search' sx={{backgroundColor: 'rgba(180,180,180)', borderRadius: '10px', width: '300px', paddingLeft: '5px'}} onChange={handleInputChange}/>
            <IconButton sx={{color: 'white'}} onClick={() => {
              setSearch('hide')
              setSearchItem('')}}>
              <HighlightOff/>
            </IconButton>
            <Box
              width='300px'
              padding={searchItem !== '' && '5px'}
              sx={{
                position: 'absolute',
                backgroundColor: 'rgba(80,80,80)',
                borderRadius: '0 0 5px 5px'
              }}
            >
              {searchItem !== '' &&
              filteredItems.map((item) => (
                <Typography 
                  sx={{cursor: 'pointer'}} 
                  onClick={() => {
                    navigate(`/item/${items.findIndex(object => object.name === item?.name)}`)
                    setSearch('hide')
                    setSearchItem('')
                  }}
                >{item.name}</Typography>
              ))}
            </Box> 
          </Box>
           :
          <IconButton sx={{color: 'white'}} onClick={() => {
            setSearch('show') 
            setProfileBoxShow(false)
            }}>               
            <SearchOutlined/>
          </IconButton>
          }
          <IconButton 
            sx={{color: 'white'}}
            onClick={() => {
              isSignedIn ?
              setProfileBoxShow((prev) => !prev) :   
              navigate('/signin')
              setSearch('hide')
              setSearchItem('')
            }}
          >
            <PersonOutline/>
          </IconButton>
          {profileBoxShow && (
            <Box 
            width='150px' 
            height='120px' 
            borderRadius='8px'
            sx={{
              position: 'absolute',
              top: '40px',
              right: '150px',
              backgroundColor: 'rgba(243, 236, 236, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}>
              <Button variant='contained' onClick={() => {
                navigate('/profile')
                setProfileBoxShow(false)
                }}>Profile</Button>
              <Button variant='contained' onClick={() => {
                dispatch(setIsSignedIn({}))
                setProfileBoxShow(false)
                location.pathname === '/profile' ?
                navigate('/') : 
                location.pathname === '/checkout' && navigate('/')
                }}>Sign Out</Button>
            </Box>  
          )}
          <Badge 
            badgeContent={cart.length} 
            color='secondary' 
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px'
              }
            }}
            >
            <IconButton 
            onClick={() => {
              dispatch(setIsCartOpen({}))
              setSearch('hide')
              setProfileBoxShow(false)
              setSearchItem('')
            }}
            sx={{color: 'white'}}>
              <ShoppingBagOutlined/>
            </IconButton>  
          </Badge>          
          {/* <IconButton sx={{color: 'white'}}>
            <MenuOutlined/>
          </IconButton>           */}
        </Box>
      </Box>      
    </Box>
  )
}

export default Navbar
