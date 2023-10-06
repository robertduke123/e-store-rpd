import React, {useState} from 'react'
import { Box, Typography, TextField, Button, Divider } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addReview } from '../../state'
import { current } from '@reduxjs/toolkit'

const Review = ({id, reviews}) => {

    const dispatch = useDispatch()
    const [review, setReview]  =useState('')
    const [reviewStars, setReviewStars] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
    })

    const confirmReview = (id, review, reviewStars) => {
        let stars= []
        Object.entries(reviewStars).forEach(entry => stars.push(entry[1]))
        dispatch(addReview({id: id, review: {stars, review}}))
    }

    const displayReview = () => {

    }


    const starReview = (number) => {
        number === 'one' && setReviewStars({one: true, two: false, three: false, four: false, five: false})
        number === 'two' && setReviewStars({one: true, two: true, three: false, four: false, five: false})
        number === 'three' && setReviewStars({one: true, two: true, three: true, four: false, five: false})
        number === 'four' && setReviewStars({one: true, two: true, three: true, four: true, five: false})
        number === 'five' && setReviewStars({one: true, two: true, three: true, four: true, five: true})        
    }

    

  return (
    <Box width='100%' padding='20px 10px'>
        <div style={{display: 'flex'}}>
            <div onClick={() => starReview('one')}>{reviewStars.one === false ? <StarBorder/> : <Star/>}</div>
            <div onClick={() => starReview('two')}>{reviewStars.two === false ? <StarBorder/> : <Star/>}</div>
            <div onClick={() => starReview('three')}>{reviewStars.three === false ? <StarBorder/> : <Star/>}</div>
            <div onClick={() => starReview('four')}>{reviewStars.four === false ? <StarBorder/> : <Star/>}</div>
            <div onClick={() => starReview('five')}>{reviewStars.five === false ? <StarBorder/> : <Star/>}</div>
        </div>
        
        <div style={{display: 'flex', padding: '0 150px 0 0'}}>
            <TextField fullWidth onChange={(e) => setReview(e.target.value)}/>
            <Button
                variant='contained' 
                color='primary' 
                sx={{
                    gridColumn: 'span 1',
                    backgroundColor: "#999999",
                    boxShadow: 'none',
                    color: 'white',
                    borderRadius: 0,
                    padding: '15px 40px'
                }}
                onClick={() => confirmReview(id, review, reviewStars)}
            >Confirm</Button>
        </div>    
        
            {reviews.map((review) => (
                <Box>  
                    <div display='flex'>
                        {review.stars.map((value) => {
                            if(value === true){ return <Star/>} else { return <StarBorder/>}
                        })}
                    </div>
                    <Typography>{review.review}</Typography> 
                    <Divider/>
                </Box>  
                ))
            }
            
      
    </Box>
  )
}

export default Review
