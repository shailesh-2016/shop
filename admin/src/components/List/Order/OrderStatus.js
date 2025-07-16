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

const OrderStatusAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/order/all"); 
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Handle status change
  const handleStatusChange = async (orderId, productId, newStatus) => {
    try {
      setUpdating(true);
      const res = await axios.put("http://localhost:8000/api/order/update-status", {
        orderId,
        productId,
        status: newStatus,
      });
      if (res.data.success) {
        // ✅ Update local state
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            const updatedProducts = order.products.map((prod) =>
              prod.productId._id === productId ? { ...prod, status: newStatus } : prod
            );
            return { ...order, products: updatedProducts };
          }
          return order;
        });
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>🧾 Order Management - Update Product Status</h5>
      </CCardHeader>
      <CCardBody>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-4">
              <h6>Order ID: {order._id}</h6>
              <CTable bordered responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Product</CTableHeaderCell>
                    <CTableHeaderCell>Quantity</CTableHeaderCell>
                    <CTableHeaderCell>Current Status</CTableHeaderCell>
                    <CTableHeaderCell>Update Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {order.products.map((product) => (
                    <CTableRow key={product.productId._id}>
                      <CTableDataCell>{product.productId.product_name}</CTableDataCell>
                      <CTableDataCell>{product.quantity}</CTableDataCell>
                      <CTableDataCell>
                        <span className="badge bg-info">{product.status}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect
                          className="mb-2"
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
  );
};

export default OrderStatusAdmin;
