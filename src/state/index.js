import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: {

            }
        ,
        isSignedIn: false,
        isCartOpen: false,
        cart: [],
        items: [],
        checkoutToken: {},
        shippingMulti: {
            countries: [],
            subs: [],
            options: []
        },
        shippingSingle: {
            country: [],
            sub: [],
            option: []
        },
        itemReviews: []
        
    }

    

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user 
        },
        setIsSignedIn: (state) => {
            state.isSignedIn = !state.isSignedIn            
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
        addToken: (state, action) => {
            state.checkoutToken = action.payload.checkoutToken
        },
        addShippingMulti: (state, action) => {
            state.shippingMulti = {...state.shippingMulti, ...action.payload}
        },
        addShippingSingle: (state, action) => {
            state.shippingSingle = {...state.shippingSingle, ...action.payload}
        }
     }
})

export const {
    setUser,
    setIsSignedIn,
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    emptyCart,
    setIsCartOpen,
    addToken,
    addShippingMulti,
    addShippingSingle
} = cartSlice.actions

export default cartSlice.reducer