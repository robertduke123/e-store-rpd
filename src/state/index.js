import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        isCartOpen: false,
        cart: [],
        items: [
            {   
                id: 0,
                image: 'https://hnsfpau.imgix.net/5/images/detailed/165/18569AU.1.jpg?fit=fill&bg=0FFF&w=785&h=441&auto=format,compress',
                name: 'Kettle',
                description: 'Electric kettle.',
                price: '$40.00'
            },
            {   
                id: 1,
                image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/input-devices/dell/keyboards/aw420k/media-gallery/keyboard-aw420k-xkb-05-bk-gallery-01.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=1389&qlt=100,1&resMode=sharp2&size=1389,402&chrss=full',
                name: 'Keyboard',
                description: 'Keyboard with LEDs',
                price: '$70.00'
            },
            {   
                id: 2,
                image: 'https://m.media-amazon.com/images/I/51GWerTmfPL._AC_SX679_.jpg',
                name: 'Spider-Man Mask',
                description: 'Keyboard with LEDs',
                price: '$60.00'
            },
        ]
    }

    

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
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
        }
     }
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions

export default cartSlice.reducer