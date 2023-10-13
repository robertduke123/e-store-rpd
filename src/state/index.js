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
        items: [],
        
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
        emptyCart : (state) => {
            state.cart = []
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
    emptyCart,
    setIsCartOpen,
    addReview
} = cartSlice.actions

export default cartSlice.reducer