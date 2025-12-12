import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./assets/css/OrderPage.css";

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  const { cart, customerName, address, email, paymentMethod, bank, total } =
    location.state || {};

  // ❗ Ngăn lỗi nếu không có dữ liệu đơn hàng
  useEffect(() => {
    if (!cart) return;

    // Tạo mã đơn hàng
    const newOrderId = "DH" + Date.now();
    setOrderId(newOrderId);

    // --- LƯU ĐƠN HÀNG ---
    const orderData = {
      id: newOrderId,
      customerName,
      address,
      email,
      paymentMethod,
      bank,
      total,
      cart,
      date: new Date().toLocaleString(),
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.push(orderData);

    localStorage.setItem("orders", JSON.stringify(savedOrders));

    // ------------------------------------------------
    // 🔥 XÓA GIỎ HÀNG NGAY SAU KHI THANH TOÁN
    // ------------------------------------------------
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated")); // cập nhật icon giỏ hàng
  }, []);

  // 🔥 Xóa đơn hàng
  const handleDeleteOrder = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = savedOrders.filter((o) => o.id !== orderId);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert("Đơn hàng đã được xóa!");
    navigate("/"); // quay về trang chủ
  };

  if (!cart) {
    return <h2>Không có đơn hàng!</h2>;
  }

  return (
    <div className="order-page">
      <h2 className="order-title">🎉 Đơn Hàng Của Bạn</h2>
      <p className="order-id">
        Mã đơn: <strong>{orderId}</strong>
      </p>

      <div className="customer-info">
        <p>
          <strong>Tên khách hàng:</strong> {customerName}
        </p>
        <p>
          <strong>Địa chỉ giao hàng:</strong> {address}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Thanh toán:</strong> {paymentMethod}
        </p>
        <p>
          <strong>Ngân hàng:</strong> {bank}
        </p>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-total">
        <h3>Tổng cộng: ${total}</h3>
      </div>

      {/* 🔥 Nút xoá đơn hàng */}
      <button className="delete-order-btn" onClick={handleDeleteOrder}>
        ❌ Xóa đơn hàng
      </button>
    </div>
  );
}
