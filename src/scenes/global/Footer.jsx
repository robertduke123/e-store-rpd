import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {


  return (
    <Box
        width='100%'
        margin='auto'
        padding='20px 10% 0'
        backgroundColor='rgba(80, 80, 80,.95)'
        color='white'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='30px'
        columnGap='clamp(20px, 30px, 40px'
    >
        <Box width='clamp(20%, 30%, 40%'>
            <Typography variant='h4' fontWeight='bold' mb='30px' color="#d6001c">ECOMMER</Typography>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi cumque, 
                cum incidunt deserunt sed minima? Sit magnam eveniet sequi voluptatibus
                 mollitia fugiat perferendis laboriosam voluptas cumque, iure debitis, 
                 doloribus corporis, illum quidem obcaecati 
            </div>
        </Box>

        <Box>
            <Typography variant='h4' fontWeight='bold' mb='30px'>About Us</Typography>
            <Typography mb='30px'>Careers</Typography>
            <Typography mb='30px'>Our Stores</Typography>
            <Typography mb='30px'>Terms & Conditions</Typography>
            <Typography mb='30px'>Privacy Policy</Typography>
        </Box>

        <Box>
            <Typography variant='h4' fontWeight='bold' mb='30px'>Customer Care</Typography>
            <Typography mb='30px'>Help Centers</Typography>
            <Typography mb='30px'>Track Your Orders</Typography>
            <Typography mb='30px'>Corporate & Bulk Purchasing</Typography>
            <Typography mb='30px'>Returns & Refunds</Typography>
        </Box>

        <Box width='clamp(20%, 25%, 30%'>
            <Typography variant='h4' fontWeight='bold' mb='30px'>Contact Us</Typography>
            <Typography mb='30px'>50 north Whatever Blvd, Washington, DC 10501</Typography>
            <Typography mb='30px'>Email: somethingsomething@gmail.com</Typography>
            <Typography mb='30px'>(222)333-4444</Typography>
        </Box>
    </Box>
  )
}

export default Footer
