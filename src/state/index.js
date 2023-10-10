import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        users: [
            {
                firstName: 'r',
                lastName: 'r',
                email: 'r',
                phone: 'r',
                streetAddress1: 'r',
                streetAddress2: 'r',
                city: 'r',
                country: 'r',
                state: 'r',
                zipCode: 'r',
                password: 'r'
            }
        ],
        isSignedIn: false,
        isCartOpen: false,
        cart: [],
        items: [
            {   
                id: 0,
                image: 'https://hnsfpau.imgix.net/5/images/detailed/165/18569AU.1.jpg?fit=fill&bg=0FFF&w=785&h=441&auto=format,compress',
                name: 'Kettle',
                category: 'newArrivals',
                description: 'Electric kettle.',
                price: '$40.00',
                reviews: [
                    {
                        stars: [true, true, true, true, true],
                        review: 'this is pretty good'
                    },
                    {
                        stars: [true, true, false, false, false],
                        review: 'this sucks'
                    }
                ]
            },
            {   
                id: 1,
                image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/input-devices/dell/keyboards/aw420k/media-gallery/keyboard-aw420k-xkb-05-bk-gallery-01.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=1389&qlt=100,1&resMode=sharp2&size=1389,402&chrss=full',
                name: 'Keyboard',
                category: 'bestSellers',
                description: 'Keyboard with LEDs',
                price: '$70.00',
                reviews: [
                    {
                        stars: [true, true, true, true, true],
                        review: 'this is pretty good'
                    },
                    {
                        stars: [true, true, false, false, false],
                        review: 'this sucks'
                    }
                ]
            },
            {   
                id: 2,
                image: 'https://m.media-amazon.com/images/I/51GWerTmfPL._AC_SX679_.jpg',
                name: 'Spider-Man Mask',
                category: 'topRated',
                description: 'Keyboard with LEDs',
                price: '$60.00',
                reviews: [
                    {
                        stars: [true, true, true, true, true],
                        review: 'this is pretty good'
                    },
                    {
                        stars: [true, true, false, false, false],
                        review: 'this sucks'
                    }
                ]
            },
        ],
        
    }

    

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        onRegisterUser: (state, action) => {
            state.users.push(action.payload)
        },
        editUser: (state, action) => {
            state.users[0] = action.payload.user
        },
        setIsSignedIn: (state) => {
            state.isSignedIn = true            
        },
        setItems: (state, action) => {
            state.items = action.payload
        },
        addToCart: (state, action) => {
            if(state.cart.some(item => item.name === action.payload.item.name)) {
                let index = state.cart.findIndex(e => e.name === action.payload.item.name)
                state.cart[index].count = state.cart[index].count  + action.payload.item.count
            } else {
                state.cart = [...state.cart, action.payload.item]
            }
        },
        removeFromCart : (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        },
        increaseCount : (state, action) => {
            state.cart = state.cart.map((item) => {
                if(item.id === action.payload.id) { 
                item.count++ }
                return item
            })
        },
        decreaseCount : (state, action) => {
            state.cart = state.cart.map((item) => {
                if(item.id === action.payload.id && item.count > 1) {
                item.count-- }
                return item
            })
        },
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen
        },
        addReview: (state, action) => {
            state.items[action.payload.id].id === action.payload.id &&
            console.log(state.items[action.payload.id].reviews);
            state.items[action.payload.id].reviews.push(action.payload.review)
        }
     }
})

export const {
    onRegisterUser,
    editUser,
    setIsSignedIn,
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    addReview
} = cartSlice.actions

export default cartSlice.reducer