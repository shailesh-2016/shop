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
import { addPro } from '../productSlice'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { viewCat } from '../userSlice'

const Create = () => {
  const [userData, setData] = useState([])
const redirect=useNavigate()
const {register,handleSubmit,reset,formState:{errors}}=useForm()
 const { userList } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewCat())
  }, [dispatch])

  console.log(userList)


const product = async (data) => {
  try {
    const formData = new FormData();
    formData.append('file', data.image[0]);
    formData.append('upload_preset', 'project');
    formData.append('cloud_name', 'dguyjd0no');

     const cloudinaryResponse = await axios.post(
      'https://api.cloudinary.com/v1_1/dguyjd0no/image/upload',
      formData
    );

    const payload = {
      
      productName: data.name,
        category: data.category,
        Price: data.price,
        Description: data.description,
      Image: cloudinaryResponse.data.secure_url,
    };

    await axios.post('http://localhost:5000/Product', payload);

    reset();
    // redirect('/View');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
// useEffect(()=>{
//   dispatch(addPro(payload))
//   reset()
// },[])


  return (
    <>
      
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>Create Product</h2>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(product)}>
            <div className="mb-3">
              <CFormLabel htmlFor="category">Category</CFormLabel>
              <CFormSelect
                id="category"
                name="category"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">-- Select Category --</option>
                {userList.map((cat) => (
                  <option key={cat.id} value={cat._id}>
                    {cat.cat_name}
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
                {...register("name", { required: "Product Name is required" })}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="price">Price</CFormLabel>
              <CFormInput
                type="number"
                id="price"
                name="price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Price should be at least 1",
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
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
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
                {...register('image', { required: 'Image is required' })}
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              />
              {errors.categoryName && <CAlert color="danger">{errors.Image.message}</CAlert>}
            </div>

            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
    </>
  )
}

export default Create
