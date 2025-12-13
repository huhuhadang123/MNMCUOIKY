import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./assets/css/OrderPage.css";

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  // 🔥 Chặn useEffect chạy 2 lần (React 18)
  const hasSaved = useRef(false);

  const { cart, customerName, address, email, paymentMethod, bank, total } =
    location.state || {};

  // ✅ FORMAT TIỀN USD CHUẨN
  const formatCurrency = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "$0.00";
    }

    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    if (!cart || cart.length === 0) return;

    if (hasSaved.current) return;
    hasSaved.current = true;

    const newOrderId = "DH" + Date.now();
    setOrderId(newOrderId);

    const orderData = {
      id: newOrderId,
      customerName,
      address,
      email,
      paymentMethod,
      bank,
      total, // LƯU USD GỐC
      cart,
      date: new Date().toLocaleString("en-US"),
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const handleDeleteOrder = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = savedOrders.filter((o) => o.id !== orderId);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert("Order has been deleted!");
    navigate("/");
  };

  if (!cart || cart.length === 0) {
    return <h2>Không có đơn hàng!</h2>;
  }

  return (
    <div className="order-page">
      <h2 className="order-title">🎉 Your Order</h2>

      <p className="order-id">
        Order ID: <strong>{orderId}</strong>
      </p>

      {/* ===== Customer Info ===== */}
      <div className="customer-info">
        <p>
          <strong>Customer:</strong> {customerName}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Payment:</strong> {paymentMethod}
        </p>
        {bank && (
          <p>
            <strong>Bank:</strong> {bank}
          </p>
        )}
      </div>

      {/* ===== Order Table ===== */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{formatCurrency(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== TOTAL ===== */}
      <div className="order-total">
        <h3>Total: {formatCurrency(total)}</h3>
      </div>

      {/* ===== DELETE ===== */}
      <button className="delete-order-btn" onClick={handleDeleteOrder}>
        ❌ Delete Order
      </button>
    </div>
  );
}
