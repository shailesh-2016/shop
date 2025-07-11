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
  import { useDispatch } from 'react-redux'
  import { addPro } from '../productSlice'
  import Swal from 'sweetalert2'
  
  const Create = () => {
    const [userData, setData] = useState([])
  
    async function showApi() {
      const res = await axios.get('http://localhost:5000/Category')
      setData(res.data)
    }
    useEffect(() => {
      showApi()
    })
  
  const {register,handleSubmit,reset,formState:{errors}}=useForm()
  const dispatch=useDispatch()
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
    
    async function product(data) {
      const base64Image = await convertToBase64(data.image[0]);
      const payload = {
        productName: data.name,
        category: data.category,
        Price: data.price,
        Description: data.description,
        Image: base64Image,
      };
      try {
        dispatch(addPro(payload))
        alert("Data submitted successfully!");
        reset();
      } catch (error) {
        console.log(error)
      }
    }
  
  // function product(data){
  //   dispatch(addPro(data))
  //   Swal.fire({
  //         position: "top-center",
  //         icon: "success",
  //         title: "Product Added Successfully!",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
    
  // }
  
  
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
                  {userData.map((cat) => (
                    <option key={cat.id} value={cat.categoryName}>
                      {cat.categoryName}
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
  