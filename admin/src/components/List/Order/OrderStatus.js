import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
  CButton,
} from "@coreui/react";

const USERS_URL = import.meta.env.VITE_BASE_URL_USERS_ALL;
const USER_ORDERS_URL = import.meta.env.VITE_BASE_URL_ORDER_BY_USER;
const ORDER_UPDATE_URL = import.meta.env.VITE_BASE_URL_ORDER_UPDATE;

const OrderStatusAdmin = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch all users on mount
  useEffect(() => {
    axios.get(USERS_URL).then((res) => {
      if (res.data.success) {
        setUsers(res.data.users);
      }
    });
  }, []);
  console.log("reesssssss",users)

  // ✅ Fetch orders for selected user
 const fetchOrdersForUser = (userId) => {
  setSelectedUser(userId);
  axios.get(`${USER_ORDERS_URL}/user/${userId}`).then((res) => {
    if (res.data.success) {
      setOrders(res.data.orders);
    }
  });
};


  // ✅ Handle status change
  const handleStatusChange = async (orderId, productId, newStatus) => {
    try {
      setUpdating(true);
      const res = await axios.put(ORDER_UPDATE_URL, {
        orderId,
        productId,
        status: newStatus,
      });
      if (res.data.success) {
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            const updatedProducts = order.products.map((prod) =>
              prod.productId._id === productId
                ? { ...prod, status: newStatus }
                : prod
            );
            return { ...order, products: updatedProducts };
          }
          return order;
        });
        setOrders(updatedOrders);
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mt-4">
      {/* Users List */}
      <CCard className="mb-4">
        <CCardHeader>
          <h5>👥 Select User</h5>
        </CCardHeader>
        <CCardBody>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <CButton
                key={user._id}
                color={selectedUser === user._id ? "primary" : "secondary"}
                className="m-1"
                onClick={() => fetchOrdersForUser(user._id)}
              >
                {user.name} ({user.email})
              </CButton>
            ))
          )}
        </CCardBody>
      </CCard>

      {/* Orders for Selected User */}
      {selectedUser && (
        <CCard>
          <CCardHeader>
            <h5>🧾 Orders for {users.find(u => u._id === selectedUser)?.name}</h5>
          </CCardHeader>
          <CCardBody>
            {orders.length === 0 ? (
              <p>No orders for this user</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="mb-4">
                  <h6>Order ID: {order._id}</h6>
                  <CTable bordered responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Product</CTableHeaderCell>
                        <CTableHeaderCell>Current Status</CTableHeaderCell>
                        <CTableHeaderCell>Update Status</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {order.products?.map((product) => (
                        <CTableRow key={product.productId?._id}>
                          <CTableDataCell>{product.productId?.product_name}</CTableDataCell>
                          <CTableDataCell>
                            <span className="badge bg-info">{product.status}</span>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CFormSelect
                              value={product.status}
                              onChange={(e) =>
                                handleStatusChange(order._id, product.productId._id, e.target.value)
                              }
                              disabled={updating}
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </CFormSelect>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              ))
            )}
          </CCardBody>
        </CCard>
      )}
    </div>
  );
};

export default OrderStatusAdmin;
