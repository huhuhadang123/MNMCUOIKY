// OrderPage.js
import React from "react";
import { useLocation } from "react-router-dom";
import "./assets/css/OrderPage.css";
export default function OrderPage() {
  const location = useLocation();
  const { cart, customerName, address, email, paymentMethod, bank, total } =
    location.state || {};

  return (
    <div className="order-page">
      <h2 className="order-title">🎉 Đơn Hàng Của Bạn</h2>
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
          <strong>Phương thức thanh toán:</strong> {paymentMethod}
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
          {cart &&
            cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="order-total">
        <h3>Tổng cộng: {total}</h3>
      </div>
    </div>
  );
}
