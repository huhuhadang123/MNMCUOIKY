import React, { useEffect, useState } from "react";
import "./assets/css/OrderList.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  // Load orders khi mở trang
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // ❗ Xóa 1 đơn hàng
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa đơn hàng này?");
    if (!confirmDelete) return;

    const updatedOrders = orders.filter((o) => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders); // 🔥 reload UI không cần F5
  };

  // ❗ Xóa tất cả đơn hàng
  const handleDeleteAll = () => {
    const confirmDelete = window.confirm("Xóa TẤT CẢ đơn hàng?");
    if (!confirmDelete) return;

    localStorage.removeItem("orders");
    setOrders([]); // 🔥 reload UI
  };

  return (
    <div className="orderlist-container">
      {/* TITLE + BUTTON */}
      <div className="title-row">
        <h2 className="title">Tất Cả Đơn Hàng</h2>

        {orders.length > 0 && (
          <button className="delete-all-btn" onClick={handleDeleteAll}>
            🗑 Xóa Tất Cả
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="empty">Chưa có đơn hàng nào!</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <p>
                Mã đơn: <strong>{order.id}</strong>
              </p>
              <p>Ngày: {order.date}</p>
            </div>

            <div className="order-info">
              <p>
                <strong>Tên khách:</strong> {order.customerName}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {order.address}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Thanh toán:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Ngân hàng:</strong> {order.bank}
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
                {order.cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="total-money">Tổng cộng: ${order.total}</h3>

            {/* 🔥 DELETE BUTTON */}
            <button
              className="delete-btn"
              onClick={() => handleDelete(order.id)}
            >
              ❌ Xóa đơn này
            </button>
          </div>
        ))
      )}
    </div>
  );
}
