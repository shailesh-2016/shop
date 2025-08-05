import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CBadge,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { delPro, viewPro } from '../productSlice'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

const View = () => {
  const { productList } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewPro())
  }, [dispatch])

  const trash = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delPro(id))
        Swal.fire('Deleted!', 'The product has been removed.', 'success')
      }
    })
  }

  return (
    <div className="container mt-5">
      <CCard className="shadow-sm">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📦 Product Management</h4>
          <CBadge color="primary" shape="rounded-pill">{productList.length} items</CBadge>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover responsive bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Product</CTableHeaderCell>
                <CTableHeaderCell>Price</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Image</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {productList.map((product, index) => (
                <CTableRow key={product._id}>
                  <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{product.category?.cat_name || '-'}</CTableDataCell>
                  <CTableDataCell>{product.product_name}</CTableDataCell>
                  <CTableDataCell>₹{product.price}</CTableDataCell>
                  <CTableDataCell className="text-truncate" style={{ maxWidth: 180 }}>
                    {product.product_description || '--'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {product.product_images?.[0] ? (
                      <img
                        src={product.product_images[0]}
                        alt="Product"
                        style={{
                          width: 90,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 6,
                          border: '1px solid #ccc',
                        }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      variant="outline"
                      size="sm"
                      className="me-2"
                      onClick={() => trash(product._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </CButton>
                    <NavLink
                      to={`/edit/${product._id}`}
                      className="btn btn-outline-warning btn-sm"
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
  )
}

export default View
