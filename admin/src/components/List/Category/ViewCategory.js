import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { delCat, viewCat } from '../userSlice'
import Swal from 'sweetalert2'
import { NavLink } from 'react-router-dom'

const ViewCategory = () => {
  const { userList } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewCat())
  }, [dispatch])

  const trash = (id) => {
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
        dispatch(delCat(id))
        Swal.fire('Deleted!', 'Category has been deleted.', 'success')
      }
    })
  }

  return (
    <div className="container mt-5">
      <CCard>
        <CCardHeader>
          <h2>📋 Category List</h2>
        </CCardHeader>
        <CCardBody>
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>

                    

                    <td>{category.cat_name}</td>

                    <td>
                      <img
                        src={category.cat_image}
                        alt="Category"
                        height="90"
                        width="130"
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </td>

                    <td>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => trash(category._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </CButton>
                      <NavLink
                        to={`/update/${category._id}`}
                        className="btn btn-warning btn-sm ms-2"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ViewCategory
