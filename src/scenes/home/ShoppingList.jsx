import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material'
import Item from '../../component/Item'

const ShoppingList = () => {

    const [value, setValue] = useState('all')
    const items = useSelector((state) => state.cart.items)
    const isNonMobile = useMediaQuery('(min-width: 600px')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    // async function getItems() {
    //     const items = await fetch(
    //         'http://localhost:1337/api/items?populate=image',
    //         {method: 'GET'}
    //     )
    //     const itemsJson = await items.json()
    //     dispatch(setItems(itemsJson.data))
    // }

    // useEffect(() => {
    //     getItems()
    // }, [])

    let topRatedItems
    let newArrivalsItems
    let bestSellersItems

    if(items?.length > 0) {
        topRatedItems = items.filter((item) => item?.categories[0].name === 'top rated')
        newArrivalsItems = items.filter((item) => item?.categories[0].name === 'new arrivals')
        bestSellersItems = items.filter((item) => item?.categories[0].name === 'best sellers')  
    }
    

    // useEffect(() => {
    //    items?.length > 0 && loadCategories()
    // }, [items])


  return (
    <Box width='80%' margin='80px auto'>
        <Typography variant='h3' textAlign='center'>Our Featured <b>Products</b></Typography>
        <Tabs
            textColor='primary'
            indicatorColor='primary'
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{sx: {display: isNonMobile? 'block' : 'none'}}}
            sx={{
                m: '25px',
                '& .MuiTabs-flexiContainer' : {
                    flexWrap: 'wrap'
                }
            }}
        >
            <Tab label='All' value='all'/>
            <Tab label='New ARRIVALS' value='newArrivals'/>
            <Tab label='BEST SELLERS' value='bestSellers'/>
            <Tab label='TOP RATED' value='topRated'/>
        </Tabs>
        <Box
            margin='0 auto'
            display='grid'
            gridTemplateColumns='repeat(auto-fill, 300px)'
            justifyContent='space-around'
            rowGap='20px'
            columnGap='1.33%'
        >
            {value === 'all' && items &&
                items.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
            {value === 'newArrivals' && items &&
                newArrivalsItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
            {value === 'bestSellers' && items &&
                bestSellersItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
            {value === 'topRated' && items &&
                topRatedItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                 ))}
        </Box>
    </Box>
  )
}

export default ShoppingList
