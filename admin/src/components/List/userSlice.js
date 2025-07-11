import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_BASE_URL

export const addCat = createAsyncThunk('user/addCat', async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
})


export const viewCat = createAsyncThunk('users/viewCat', async () => {
  const res = await axios.get(API_URL)
  console.log(res)
  return res.data
})

export const delCat = createAsyncThunk('users/delCat', async (id) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
})

// ✅ 
export const updateCat = createAsyncThunk('users/updateCat', async ({ id, formData }) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
});




const initialState = {
  userList: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCat.fulfilled, (state, action) => {
        state.userList.push(action.payload)
      })
      .addCase(viewCat.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(delCat.fulfilled, (state, action) => {
        const id = action.payload
        state.userList = state.userList.filter((user) => user._id !== id)
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        const updated = action.payload
        const index = state.userList.findIndex((user) => user._id === updated._id)
        if (index !== -1) {
          state.userList[index] = updated
        }
      })
  },
})

export default userSlice.reducer
