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
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { viewCat } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { addPro } from '../productSlice'
import Swal from 'sweetalert2'

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL']

const Create = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userList } = useSelector((state) => state.users)

  const [sizeStock, setSizeStock] = useState(
    sizeOptions.map((sz) => ({ size: sz, stock: 0 }))
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    dispatch(viewCat())
  }, [dispatch])

  const handleSizeStockChange = (index, value) => {
    const newSizes = [...sizeStock]
    newSizes[index].stock = parseInt(value) || 0
    setSizeStock(newSizes)
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      // Images
      for (let i = 0; i < data.product_images.length; i++) {
        formData.append('product_images', data.product_images[i])
      }

      // Fields
      formData.append('product_name', data.product_name)
      formData.append('product_description', data.product_description)
      formData.append('price', data.price)
      formData.append('discount_price', data.discount_price)
      formData.append('material', data.material)
      formData.append('quantity', data.quantity)
      formData.append('category', data.category)

      // ✅ Size-wise stock
      formData.append('sizeStock', JSON.stringify(sizeStock))

      await dispatch(addPro(formData))
      reset()
      setSizeStock(sizeOptions.map((sz) => ({ size: sz, stock: 0 })))

      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: '✅ Product Created Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      console.error('Product submit error:', err)
    }
  }

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>Create Product</h2>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            {/* Category */}
            <div className="mb-3">
              <CFormLabel>Category</CFormLabel>
              <CFormSelect {...register('category', { required: 'Category is required' })}>
                <option value="">-- Select Category --</option>
                {userList.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.cat_name}
                  </option>
                ))}
              </CFormSelect>
              {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>

            {/* Name */}
            <div className="mb-3">
              <CFormLabel>Product Name</CFormLabel>
              <CFormInput {...register('product_name', { required: 'Product Name is required' })} />
              {errors.product_name && <p className="text-danger">{errors.product_name.message}</p>}
            </div>

            {/* Description */}
            <div className="mb-3">
              <CFormLabel>Description</CFormLabel>
              <CFormTextarea
                rows="3"
                {...register('product_description', { required: 'Description is required' })}
              />
              {errors.product_description && (
                <p className="text-danger">{errors.product_description.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="mb-3">
              <CFormLabel>Price</CFormLabel>
              <CFormInput type="number" {...register('price', { required: 'Price is required' })} />
              {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </div>

            {/* Discount */}
            <div className="mb-3">
              <CFormLabel>Discount Price</CFormLabel>
              <CFormInput type="number" {...register('discount_price')} />
            </div>

         

            {/* ✅ Size & Stock */}
            <div className="mb-3">
              <CFormLabel>Size & Stock</CFormLabel>
              {sizeStock.map((item, index) => (
                <div className="d-flex align-items-center gap-3 mb-2" key={item.size}>
                  <strong style={{ width: 40 }}>{item.size}</strong>
                  <CFormInput
                    type="number"
                    min={0}
                    placeholder="Enter stock"
                    value={item.stock}
                    onChange={(e) => handleSizeStockChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

         

            {/* Images */}
            <div className="mb-3">
              <CFormLabel>Upload Product Images</CFormLabel>
              <CFormInput
                type="file"
                multiple
                accept="image/*"
                {...register('product_images', { required: 'At least one image is required' })}
              />
              {errors.product_images && (
                <p className="text-danger">{errors.product_images.message}</p>
              )}
            </div>

            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Create
