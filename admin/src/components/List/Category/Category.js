import React from 'react'
import { useForm } from 'react-hook-form'
import {
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
  CAlert,
} from '@coreui/react'
import { useDispatch } from 'react-redux'
import { addCat } from '../userSlice'
import Swal from 'sweetalert2'

const Category = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('cat_name', data.cat_name)
    formData.append('cat_image', data.cat_image[0])
   

    dispatch(addCat(formData))

    reset()
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Your Category has been saved',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>Add New Category</h2>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <CFormLabel htmlFor="cat_name">Category Name</CFormLabel>
              <CFormInput
                id="cat_name"
                type="text"
                {...register('cat_name', { required: 'Category name is required' })}
              />
              {errors.cat_name && <CAlert color="danger">{errors.cat_name.message}</CAlert>}
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="cat_image">Upload Category Image</CFormLabel>
              <CFormInput
                type="file"
                id="cat_image"
                accept="image/*"
                {...register('cat_image', { required: 'Image is required' })}
              />
              {errors.cat_image && <CAlert color="danger">{errors.cat_image.message}</CAlert>}
            </div>

            <CButton type="submit" color="primary">
              Add Category
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Category
