import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Badge, Box, IconButton, Typography } from '@mui/material'
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { setIsCartOpen } from '../../state'

const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const cart = useSelector((state) => state.cart.cart)
    const [search, setSearch] = useState('hide')
    const [searchItem, setSearchItem] = useState('')
    const [filteredItems, setFilteredItems] = useState(items)

    const handleInputChange = (e) => { 
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)

      const filterItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredItems(filterItems);
    }

    console.log(filteredItems);

    // document.addEventListener('click', () => setSearch('hide'))

  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      height='60px'
      backgroundColor='rgba(255,255,255,.95)'
      color='black'
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
          color="#d6001c"
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
            <TextField variant='standard' type='search' sx={{color: 'gray', width: '300px', paddingLeft: '5px'}} onChange={handleInputChange}/> 
            <Box
              sx={{
                position: 'absolute',
                width: '300px',
                padding: '5px',
                backgroundColor: 'red',
                borderRadius: '0 0 5px 5px'
              }}
            >
              {searchItem !== '' &&
              filteredItems.map((item) => (
                <Typography cursor='pointer'>{item.name}</Typography>
              ))}
            </Box> 
          </Box>
           :
          <IconButton sx={{color: 'black'}} onClick={() => setSearch('show')}>               
            <SearchOutlined/>
          </IconButton>
          }
          <IconButton sx={{color: 'black'}}>
            <PersonOutline/>
          </IconButton>
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
            onClick={() => dispatch(setIsCartOpen({}))}
            sx={{color: 'black'}}>
              <ShoppingBagOutlined/>
            </IconButton>  
          </Badge>          
          <IconButton sx={{color: 'black'}}>
            <MenuOutlined/>
          </IconButton>          
        </Box>
      </Box>      
    </Box>
  )
}

export default Navbar
