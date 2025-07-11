import React, { useEffect } from 'react'
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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { delPro, viewPro } from '../productSlice'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

const View = () => {
  const { productList } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  function trash(id) {
    alert(id)
  }

  useEffect(() => {
    dispatch(viewPro())
  }, [dispatch])

  console.log(productList)
  function trash(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        })
        dispatch(delPro(id))
      }
    })
  }

  return (
    <>
      <div className="container mt-5">
        <CCard>
          <CCardHeader>
            <h2>Product List</h2>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive bordered>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
             <CTableBody>
  {productList.map((product, index) => (
    <CTableRow key={product._id}>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>

      {/* CATEGORY */}
      <CTableDataCell>{product.category?.cat_name}</CTableDataCell>

      {/* NAME */}
      <CTableDataCell>{product.product_name}</CTableDataCell>

      {/* PRICE */}
      <CTableDataCell>{product.price}</CTableDataCell>

      {/* DESCRIPTION */}
      <CTableDataCell>{product.product_description}</CTableDataCell>

      {/* IMAGE */}
      <CTableDataCell>
        {product.product_images && product.product_images.length > 0 && (
          <img width={100} src={product.product_images[0]} alt="Product" />
        )}
      </CTableDataCell>

      {/* ACTION */}
      <CTableDataCell>
        <CButton
          className="btn btn-outline-danger ms-1"
          size="sm"
          onClick={() => trash(product._id)}
        >
          <i className="fa-solid fa-xmark"></i>
        </CButton>
        <NavLink
          to={`/edit/${product._id}`}
          className="btn btn-outline-warning btn-sm ms-2"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </NavLink>
      </CTableDataCell>
    </CTableRow>
  ))}
</CTableBody>

            </CTable>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default View
