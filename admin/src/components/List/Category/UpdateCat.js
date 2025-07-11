import React, { useEffect } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCat, viewCat } from '../userSlice'
import Swal from 'sweetalert2'

const UpdateCat = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const redirect = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { userList } = useSelector((state) => state.users)

  const singleCat = userList.find((cat) => cat._id === id)
  const selectedImage = watch('cat_image')

  useEffect(() => {
    dispatch(viewCat())
  }, [dispatch])

  useEffect(() => {
    if (singleCat) {
      reset({
        cat_name: singleCat.cat_name,
        cat_image: '',
      })
    }
  }, [singleCat, reset])

const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append('cat_name', data.cat_name);

  if (data.cat_image && data.cat_image[0]) {
    formData.append('cat_image', data.cat_image[0]);
  }

  // ✅ Print each key-value for debug
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    await dispatch(updateCat({ id, formData })).unwrap();

    // ✅ Show success message
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Category Updated Successfully!',
      showConfirmButton: false,
      timer: 1500,
    });

    redirect('/CATEGORY/View Category');
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
};



  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>📝 Update Category</h2>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name */}
            <div className="mb-3">
              <CFormLabel htmlFor="cat_name">Category Name</CFormLabel>
              <CFormInput
                id="cat_name"
                type="text"
                {...register('cat_name', {
                  required: 'Category name is required',
                })}
                className={`form-control ${errors.cat_name ? 'is-invalid' : ''}`}
              />
              {errors.cat_name && (
                <CAlert color="danger">{errors.cat_name.message}</CAlert>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <CFormLabel htmlFor="cat_image">Upload New Image (Optional)</CFormLabel>
              <CFormInput
                type="file"
                id="cat_image"
                accept="image/*"
                {...register('cat_image')}
              />
            </div>

            {/* Preview Image */}
            {selectedImage && selectedImage[0] ? (
              <div className="mb-3 text-center">
                <img
                  src={URL.createObjectURL(selectedImage[0])}
                  alt="Preview"
                  height={120}
                  style={{ borderRadius: '10px' }}
                />
              </div>
            ) : (
              singleCat?.cat_image && (
                <div className="mb-3 text-center">
                  <img
                    src={singleCat.cat_image}
                    alt="Current"
                    height={120}
                    style={{ borderRadius: '10px' }}
                  />
                </div>
              )
            )}

            <CButton type="submit" color="warning">
              Update Category
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default UpdateCat
