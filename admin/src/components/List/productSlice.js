import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { data } from 'autoprefixer'
import axios from 'axios'

const Product_URL = 'http://localhost:5000/Product'

export const addPro = createAsyncThunk('product/addPro', async (data) => {
  const res = await axios.post(Product_URL, data)
  console.log(res.data)
  return res.data
})
export const viewPro = createAsyncThunk('product/viewPro', async () => {
  const res = await axios.get(Product_URL)
  return res.data
})
export const delPro = createAsyncThunk('product/delPro', async (id) => {
  await axios.delete(`${Product_URL}/${id}`)
  return id
})
export const editPro = createAsyncThunk('product/editPro', async (data) => {
  const { id } = data
  await axios.put(`${Product_URL}/${id}`, data)
})

const initialState = {
  productList: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPro.fulfilled, (state, action) => {
        state.productList.push(action.payload)
      })
      .addCase(viewPro.fulfilled, (state, action) => {
        state.productList = action.payload
      })
      .addCase(delPro.fulfilled, (state, action) => {
        const id = action.payload
        const filterData = state.productList.filter((user) => {
          return user.id !== id
        })
        state.productList = filterData
      })
      .addCase(editPro.fulfilled, (state, action) => {
        const id = action.payload
        const pro_num = state.productList.findIndex((user) => {
          return user.id == id
        })
        if (pro_num != -1) {
          state.productList[pro_num] = action.payload
        }
      })
  },
})
export default productSlice.reducer
