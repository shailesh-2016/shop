import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_BASE_URL

// Add Category
export const addCat = createAsyncThunk('category/addCat', async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
})

// View Categories
export const viewCat = createAsyncThunk('category/viewCat', async () => {
  const res = await axios.get(API_URL)
  console.log(res)
  return res.data
})

// Delete Category
export const delCat = createAsyncThunk('category/delCat', async (id) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
})

// Update Category
export const updateCat = createAsyncThunk('category/updateCat', async ({ id, formData }) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
})

const initialState = {
  categoryList: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCat.fulfilled, (state, action) => {
        state.categoryList.push(action.payload)
      })
      .addCase(viewCat.fulfilled, (state, action) => {
        state.categoryList = action.payload
      })
      .addCase(delCat.fulfilled, (state, action) => {
        const id = action.payload
        state.categoryList = state.categoryList.filter((cat) => cat._id !== id)
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        const updated = action.payload
        const index = state.categoryList.findIndex((cat) => cat._id === updated._id)
        if (index !== -1) {
          state.categoryList[index] = updated
        }
      })
  },
})

export default categorySlice.reducer
