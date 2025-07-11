import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const Product_URL = 'http://localhost:8000/api/products' // 🔁 update URL if needed

// ✅ Add Product
export const addPro = createAsyncThunk('product/addPro', async (data) => {
  const res = await axios.post(Product_URL, data)
  return res.data
})

// ✅ View All Products
export const viewPro = createAsyncThunk('product/viewPro', async () => {
  const res = await axios.get(Product_URL)
  return res.data.products // ✅ as per controller structure
})

// ✅ Delete Product
export const delPro = createAsyncThunk('product/delPro', async (id) => {
  await axios.delete(`${Product_URL}/${id}`)
  return id
})

// ✅ Edit Product
export const editPro = createAsyncThunk('product/editPro', async ({ id, formData }) => {
  const res = await axios.put(`${Product_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data.product
})


const initialState = {
  productList: [],
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ➕ Add
      .addCase(addPro.fulfilled, (state, action) => {
        state.productList.push(action.payload)
      })

      // 👁 View
      .addCase(viewPro.fulfilled, (state, action) => {
        state.productList = action.payload
      })

      // ❌ Delete
      .addCase(delPro.fulfilled, (state, action) => {
        const id = action.payload
        state.productList = state.productList.filter((item) => item._id !== id)
      })

      // ✏️ Edit
      .addCase(editPro.fulfilled, (state, action) => {
        const updated = action.payload
        const index = state.productList.findIndex((item) => item._id === updated._id)
        if (index !== -1) {
          state.productList[index] = updated
        }
      })
  },
})

export default productSlice.reducer
