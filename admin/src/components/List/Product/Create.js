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
  CFormCheck,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { viewCat } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { addPro } from '../productSlice'
import Swal from 'sweetalert2'

const Create = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userList } = useSelector((state) => state.users)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    dispatch(viewCat())
  }, [dispatch])

 const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      for (let i = 0; i < data.product_images.length; i++) {
      formData.append("product_images", data.product_images[i]);
    }

    // Append individual fields
    formData.append("product_name", data.product_name);
    formData.append("product_description", data.product_description);
    formData.append("price", data.price);
    formData.append("discount_price", data.discount_price);
    formData.append("material", data.material);
    formData.append("quantity", data.quantity);
    formData.append("category", data.category);
    formData.append("rating", data.rating || 0);
    formData.append("reviews", data.reviews || 0);
    formData.append("isAvailable", data.isAvailable ? "true" : "false");

      await dispatch(addPro(formData))

      
    

      reset()
       Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your Product has been saved',
            showConfirmButton: false,
            timer: 1500,
          })
    } catch (err) {
      console.error('Product submit error:', err)
      // toast.error('Failed to submit product')
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

            {/* Product Name */}
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

            {/* Discount Price */}
            <div className="mb-3">
              <CFormLabel>Discount Price</CFormLabel>
              <CFormInput type="number" {...register('discount_price')} />
            </div>

            {/* Material */}
            <div className="mb-3">
              <CFormLabel>Material</CFormLabel>
              <CFormSelect {...register('material', { required: 'Material is required' })}>
                <option value="">-- Select Material --</option>
                <option value="18K Gold">18K Gold</option>
                <option value="22K Gold">22K Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="White Gold">White Gold</option>
              </CFormSelect>
              {errors.material && <p className="text-danger">{errors.material.message}</p>}
            </div>

            {/* Size */}
            <div className="mb-3">
              <CFormLabel>Size</CFormLabel>
              <div className="d-flex gap-3 flex-wrap">
                {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                  <CFormCheck
                    key={sz}
                    label={sz}
                    value={sz}
                    {...register('size')}
                    type="checkbox"
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <CFormLabel>Quantity</CFormLabel>
              <CFormInput
                type="number"
                defaultValue={1}
                {...register('quantity', { required: 'Quantity is required' })}
              />
              {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
            </div>

            {/* Image URLs */}
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
