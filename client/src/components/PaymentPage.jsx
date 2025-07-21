// import React from "react";
// import axios from "axios";
// import { loadRazorpayScript } from "../utils/loadRazorpay";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Button, Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; // ✅ Step 1

// const PaymentPage = () => {
//   const navigate = useNavigate(); // ✅ Step 2
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.productId.price * item.quantity,
//     0
//   );
//   const shipping = 20;
//   const tax = 20;
//   const total = subtotal + shipping + tax;

//   const handlePayment = async () => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       toast.error("Razorpay SDK failed to load");
//       return;
//     }

//     const { data } = await axios.post(
//       "http://localhost:8000/api/payment/checkout",
//       {
//         amount: total,
//       }
//     );

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: data.order.amount,
//       currency: "INR",
//       name: "Arbuda Store",
//       description: "Test Transaction",
//       order_id: data.order.id,
//       handler: async function (response) {
//         try {
//           const verifyRes = await axios.post(
//             "http://localhost:8000/api/payment/verify",
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               userId: user?.id,
//               amount: total,
//             }
//           );

//           if (verifyRes.data.success) {
//             toast.success("✅ Payment Successful!");
//             navigate("/order-success");
//           } else {
//             toast.error("❌ Payment Failed");
//           }
//         } catch (err) {
//           toast.error("❌ Payment Error");
//         }
//       },
//       prefill: {
//         name: user?.name,
//         email: user?.email,
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <Container className="text-center my-5">
//       <h4>Total Payment: ₹{total}</h4>
//       <Button variant="success" className="mt-3" onClick={handlePayment}>
//         Pay Now
//       </Button>
//     </Container>
//   );
// };

// export default PaymentPage;
