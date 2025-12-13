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

  // ✅ FORMAT TIỀN USD (GIỮ NGUYÊN ĐÔ)
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
      total,
      cart,
      date: new Date().toLocaleString("vi-VN"),
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
    alert("Đơn hàng đã được xóa!");
    navigate("/");
  };

  if (!cart || cart.length === 0) {
    return <h2>Không có đơn hàng!</h2>;
  }

  return (
    <div className="order-page">
      <h2 className="order-title">🎉 Đơn Hàng Của Bạn</h2>

      <p className="order-id">
        Mã đơn hàng: <strong>{orderId}</strong>
      </p>

      {/* ===== Thông tin khách hàng ===== */}
      <div className="customer-info">
        <p>
          <strong>Khách hàng:</strong> {customerName}
        </p>
        <p>
          <strong>Địa chỉ giao hàng:</strong> {address}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phương thức thanh toán:</strong> {paymentMethod}
        </p>
        {bank && (
          <p>
            <strong>Ngân hàng:</strong> {bank}
          </p>
        )}
      </div>

      {/* ===== Bảng sản phẩm ===== */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá (USD)</th>
            <th>Thành tiền (USD)</th>
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

      {/* ===== Tổng tiền ===== */}
      <div className="order-total">
        <h3>Tổng cộng: {formatCurrency(total)}</h3>
      </div>

      {/* ===== Xóa đơn ===== */}
      <button className="delete-order-btn" onClick={handleDeleteOrder}>
        ❌ Xóa đơn hàng
      </button>
    </div>
  );
}
