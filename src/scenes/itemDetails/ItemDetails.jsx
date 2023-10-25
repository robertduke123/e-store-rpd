import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Box, Typography, Button, Tabs, Tab } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { addToCart } from '../../state'
import { useParams } from 'react-router-dom'
import Item from '../../component/Item'
import Review from './Review'

const ItemDetails = () => {

  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const { itemId } = useParams()
  const  [ value, setValue ] = useState('description')
  const [ count, setCount ] = useState(1)
  const [ item, setItem ] = useState(null)
  // const [ items, setItems ] = useState(allItems)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }



    async function getItem() {
        await setItem(items[itemId])
    }

  // async function getItem() {
  //       const item = await fetch(
  //           `http://localhost:1337/api/items/${itemId}?populate=image`,
  //           {method: 'GET'}
  //       )
  //       const itemJson = await item.json()
  //       setItem(itemJson.data)
  //   }

  // async function getItems() {
  //       const items = await fetch(
  //           'http://localhost:1337/api/items?populate=image',
  //           {method: 'GET'}
  //       )
  //       const itemsJson = await items.json()
  //       setItems(itemsJson.data)
  //   }

    useEffect(() => {
      getItem()
    }, [itemId, items]) // eslint-disable-line react-hooks/exhaustive-deps

    // const confirmReview = (id, review, reviewStars) => {
    //     let stars= []
    //     Object.entries(reviewStars).forEach(entry => stars.push(entry[1]))
    //     dispatch(addReview({review: {id: id, reviews: [{stars, review}]}}))
    // }

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* IMAGES */}
        <Box flex='1 1 40%' mb='40px'>
          <img
            alt={item?.name}
            width='100%'
            height='100%'
            src={item?.image.url}
            style={{objectFit: 'contain', maxHeight: '500px'}}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex='1 1 50%'>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Items</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m='65px 0 25px 0'>
            <Typography variant='h3'>{item?.name}</Typography>
            <Typography>{item?.price.formatted_with_symbol}</Typography>
            <Typography sx={{mt: '20px'}} dangerouslySetInnerHTML={{__html: item?.description}} />
          </Box>

          {/* COUNT & BUTTON */}
          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              border='1.5px solid #e66677'
              mr='20px'
              p='2px 5px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon/>
              </IconButton>
              <Typography sx={{p: '0 5px'}}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon/>
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px'
              }}
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count}}))
                setCount(1)
              }}
            >
              ADD TO CART
            </Button>
          </Box>
          
          <Box>
            <Box m='20px 0 5px 0' display='flex'>
              <FavoriteBorderOutlinedIcon/>
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>  
            {/* <Typography>CATEGORIES: {item?.attributes?.category}</Typography> */}
          </Box>          
        </Box>
      </Box>   

         {/* INFORMATION */}
         <Box m='20px 0'>
          <Tabs value={value} onChange={handleChange}>
              <Tab label='DESCRIPTION' value='description'/>
              <Tab label='REVIEWS' value='reviews'/>
          </Tabs>
         </Box>
         <Box display='flex' flexWrap='wrap' gap='15px'>
            {value === 'description' && <div dangerouslySetInnerHTML={{__html: item?.description}} />}  
            {value === 'reviews' && <Review id={item?.id} />}  
         </Box>

         {/* RELATED ITEMS */}
         <Box mt='50px' width='100%'> 
            <Typography variant='h3' fontWeight='bold'>Related Products</Typography>
            <Box
              mt='20px'
              display='flex'
              flexWrap='wrap'
              columnGap='1.33%'
              justifyContent='space-between'
            >
              {items?.slice(0,4).map((item, i) => (
                <Item key={`${item.name}-${item.id}`} item={item}/>
              ))}
            </Box>
         </Box>
    </Box>
  )
}

export default ItemDetails
