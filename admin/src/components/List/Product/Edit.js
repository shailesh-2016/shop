import React, { useEffect, useState } from 'react'
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editPro, viewPro } from '../productSlice'
import axios from 'axios'
import Swal from 'sweetalert2'

const Edit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()

  const { id } = useParams()
  const redirect = useNavigate()
  const { productList } = useSelector((state) => state.product)

  console.log(productList)

  const single = productList.find((user) => {
    return user.id == id
  })

  function edit(data) {
    dispatch(editPro(data))
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Product data Updated!',
      showConfirmButton: false,
      timer: 1500,
    })
    redirect('/PRODUCT/View Product')
  }
  useEffect(() => {
    dispatch(viewPro())
    reset(single)
  }, [dispatch])

  return (
    <>
      <div className="container mt-5">
        <CCard>
          <CCardHeader>
            <h2>Update Product</h2>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(edit)}>
              <div className="mb-3">
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormSelect
                  id="category"
                  name="category"
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">-- Select Category --</option>
                  {productList.map((cat) => (
                    <option key={cat.id} value={cat.categoryNam}>
                      {cat.category}
                    </option>
                  ))}
                </CFormSelect>
                {errors.category && <p className="text-danger">{errors.category.message}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="name">Product Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  {...register('productName', { required: 'Product Name is required' })}
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="price">Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="price"
                  name="price"
                  {...register('Price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: 'Price should be at least 1',
                    },
                  })}
                />
                {errors.price && <p className="text-danger">{errors.price.message}</p>}
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="description">Description</CFormLabel>
                <CFormTextarea
                  id="description"
                  name="description"
                  rows="4"
                  {...register('Description', {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters',
                    },
                  })}
                />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Image">Upload Image</CFormLabel>
                <CFormInput
                  id="image"
                  type="file"
                  {...register('image', )}
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                />
                {errors.categoryName && <CAlert color="danger">{errors.Image.message}</CAlert>}
              </div>

              <CButton type="submit" color="warning">
                Update
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Edit
