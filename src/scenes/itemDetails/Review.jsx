import React, {useEffect, useState} from 'react'
import { Box, Typography, TextField, Button, Divider } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'

const Review = ({id}) => {

    const [thisReviews, setThisReviews] = useState([])
    const [review, setReview]  =useState('')
    const [reviewStars, setReviewStars] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false
    })
    const getReviews = async() => {
        await fetch(
            // 'http://localhost:3000/get_reviews'
            'https://e-store-api-0tkm.onrender.com/get_reviews'
            , {
          method: 'GET',
          headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(row => {
                console.log(row);
               if(row.product_id === id) {
                let state = []
                let thisState = {
                    stars: [],
                    review: ''
                }
                    for(let i = 0; i< row?.review_text.length; i++) {
                        console.log(i);
                        thisState = {
                            stars: [row.star_one[i],row.star_two[i],row.star_three[i],row.star_four[i],row.star_five[i]],
                            review: row.review_text[i]
                        }
                        state.push(thisState)
                    }
                setThisReviews(state)
                state = []   
               } 
            })
                   
        })
    }

    useEffect(() => {
        id && getReviews()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const confirmReview = (id, review, reviewStars) => {
        let stars= []
        Object.entries(reviewStars).forEach(entry => stars.push(entry[1]))
        // dispatch(addReview({review: {id: id, reviews: [{stars, review}]}}))
        fetch(
            // 'http://localhost:3000/reviews'
            'https://e-store-api-0tkm.onrender.com/reviews'
            , {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            product_id: id,
            stars: stars,
            review: review
          })
        })
        .then(response => response.json())
        .then(data => {
        let state = []
        let thisState = {
            stars: [],
            review: ''
        }
            for(let i = 0; i< data?.review_text.length; i++) {
                console.log(i);
                thisState = {
                    stars: [data.star_one[i],data.star_two[i],data.star_three[i],data.star_four[i],data.star_five[i]],
                    review: data.review_text[i]
                }
                state.push(thisState)
            }
        setThisReviews(state)
        state = []
        })
    }
     
    const starReview = (number) => {
        number === 'one' && setReviewStars({one: true, two: false, three: false, four: false, five: false})
        number === 'two' && setReviewStars({one: true, two: true, three: false, four: false, five: false})
        number === 'three' && setReviewStars({one: true, two: true, three: true, four: false, five: false})
        number === 'four' && setReviewStars({one: true, two: true, three: true, four: true, five: false})
        number === 'five' && setReviewStars({one: true, two: true, three: true, four: true, five: true})        
    }    
  Object.entries(reviewStars).forEach(entry => (entry.includes(true)))

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
            <TextField fullWidth value={review} onChange={(e) => setReview(e.target.value)}/>
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
                onClick={() => {
                    if(review !== '') {
                    confirmReview(id, review, reviewStars)
                    setReview('')
                    setReviewStars({one: false, two: false, three: false, four: false, five: false})
                }}}
            >Confirm</Button>
        </div>    
        
            {thisReviews.length > 0 && thisReviews.map((review) => (
                <Box key={`review ${thisReviews.indexOf(review)}`} paddingTop='15px'>  
                    <div display='flex'>
                        {review.stars.map((value) => {
                            if(value === true){ return <Star key={`star ${review.stars.indexOf(value)}`}/>} else { return <StarBorder key={`star ${review.stars.indexOf(value)}`}/>}
                        })}
                    </div>
                    <Typography>{review.review}</Typography> 
                    <Divider sx={{paddingTop: '15px'}}/>
                </Box> 
                ))
                }
            
      
    </Box>
  )
}

export default Review
