import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartItems from '../cartItems'
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    try {
      const response = await axios(url)
      return response.data
    } catch (error) {
      return error.message
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const tempItems = state.cartItems
      state.cartItems = tempItems.filter((item) => item.id !== action.payload)
    },
    increaseItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          item.amount += 1
          return item
        }
        return item
      })
    },
    decreaseItem: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          item.amount -= 1
          return item
        }
        return item
      })
    },
    calculateTotal: (state) => {
      const tempItems = state.cartItems
      let amount = 0
      let total = 0
      tempItems?.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false
        console.log(action)
      })
  },
})
export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotal,
} = cartSlice.actions
export default cartSlice.reducer
