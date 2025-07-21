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
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editPro, viewPro } from '../productSlice'
import { viewCat } from '../userSlice'
import Swal from 'sweetalert2'

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL']

const Edit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { productList } = useSelector((state) => state.product)
  const { userList } = useSelector((state) => state.users)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const [sizeStock, setSizeStock] = useState(
    sizeOptions.map((sz) => ({ size: sz, stock: 0 }))
  )

  const single = productList.find((p) => p._id === id)

  useEffect(() => {
    dispatch(viewPro())
    dispatch(viewCat())
  }, [dispatch])

  useEffect(() => {
    if (single) {
      setValue('category', single.category?._id || single.category)
      setValue('product_name', single.product_name)
      setValue('product_description', single.product_description)
      setValue('price', single.price)
      setValue('discount_price', single.discount_price)
      setValue('material', single.material)
      setValue('quantity', single.quantity)

      // ✅ Set size stock if available
      if (single.sizeStock?.length > 0) {
        setSizeStock(
          sizeOptions.map((size) => {
            const match = single.sizeStock.find((s) => s.size === size)
            return { size, stock: match ? match.stock : 0 }
          })
        )
      }
    }
  }, [single, setValue])

  const handleSizeStockChange = (index, value) => {
    const newSizes = [...sizeStock]
    newSizes[index].stock = parseInt(value) || 0
    setSizeStock(newSizes)
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      for (let i = 0; i < (data.product_images?.length || 0); i++) {
        formData.append('product_images', data.product_images[i])
      }

      formData.append('category', data.category)
      formData.append('product_name', data.product_name)
      formData.append('product_description', data.product_description)
      formData.append('price', data.price)
      formData.append('discount_price', data.discount_price || 0)

      // ✅ Send sizeStock
      formData.append('sizeStock', JSON.stringify(sizeStock))

      await dispatch(editPro({ id, formData }))

      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: '✅ Product Updated',
        showConfirmButton: false,
        timer: 1500,
      })

      navigate('/PRODUCT/View Product')
    } catch (err) {
      console.error('❌ Edit failed:', err)
    }
  }

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>Update Product</h2>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
              <CFormInput type="file" multiple accept="image/*" {...register('product_images')} />
            </div>

            <CButton type="submit" color="warning">
              Update
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Edit
