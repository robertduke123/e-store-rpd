import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { addToCart } from '../state'
import { useNavigate } from 'react-router-dom'

const Item = ({item, width}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const [count, setCount] = useState(1)
    const [isHovered, setIsHovered] = useState(false)

    const { price, name, image } = item
    // const {
    //     data: {
    //         attributes: {
    //             formats: {
    //                 medium: { url }
    //             }
    //         }
    //     }
    // } = image

  return (
    <Box width={width}>
        <Box
            position='relative'
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            <img
                alt={name}
                width='300px'
                height='400px'
                src={image.url}
                onClick={() => {navigate(`/item/${items.findIndex(object => object.name === item?.name)}`)}}
                style={{ cursor: 'pointer', objectFit: 'cover'}}
            />
            <Box
                display={isHovered ? 'block' : 'none'}
                position='absolute'
                bottom='10%'
                left='0'
                width='100%'
                padding='0  5%'
            >
                <Box display='flex' justifyContent='space-between'>
                    {/* AMOUNT */}
                    <Box 
                        display='flex' 
                        alignItems='center' 
                        backgroundColor="#f7ccd2"
                        borderRadius='3px'
                    >
                        <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                            <RemoveIcon/>
                        </IconButton>
                        <Typography color="#666666">{count}</Typography>
                        <IconButton onClick={() => setCount(count + 1)}>
                            <AddIcon/>
                        </IconButton>
                    </Box>

                {/* BUTTON */}
                <Button
                    onClick={() => {
                        dispatch(addToCart({item: { ...item, count}}))
                        setCount(1)
                    }}
                    sx={{ backgroundColor: "#666666", color: 'white'}}
                >Add to Cart
                </Button>
                </Box>
            </Box>
        </Box>      

        <Box mt='3px'>
            {/* <Typography variant='subtitle2' color="#800011">
                {category
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography> */}
            <Typography>{name}</Typography>
            <Typography fontWeight='bold'>{price.formatted_with_symbol}</Typography>
        </Box>
    </Box>
  )
}

export default Item
