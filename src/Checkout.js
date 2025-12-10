import React, { useState, useEffect } from "react";
import "./assets/css/ThanhToan.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Thông tin khách hàng
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bank, setBank] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleCheckout = () => {
    // KIỂM TRA THIẾU DỮ LIỆU
    if (!customerName.trim()) {
      alert("Vui lòng nhập tên khách hàng!");
      return;
    }
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }
    if (!email.trim()) {
      alert("Vui lòng nhập email!");
      return;
    }
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    if (!bank) {
      alert("Vui lòng chọn ngân hàng!");
      return;
    }

    setOrderPlaced(true);
    alert("Thanh toán thành công!");
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Trang Thanh Toán</h2>

      <div className="checkout-form">
        <label>Tên khách hàng</label>
        <input
          type="text"
          placeholder="Hoàng Hải Đăng"
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label>Địa chỉ giao hàng</label>
        <input
          type="text"
          placeholder="33 vĩnh viễn"
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="23662054@kthcm.edu.vn"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phương thức thanh toán</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="pay"
              value="Thẻ tín dụng"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thẻ tín dụng
          </label>

          <label>
            <input
              type="radio"
              name="pay"
              value="Paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Paypal
          </label>
        </div>

        <label>Chọn ngân hàng</label>
        <select onChange={(e) => setBank(e.target.value)}>
          <option value="">-- Chọn ngân hàng --</option>
          <option value="MBBank">MBBank</option>
          <option value="Vietcombank">Vietcombank</option>
          <option value="Techcombank">Techcombank</option>
        </select>

        <div className="checkout-total">
          Tổng tiền: {total.toLocaleString()} VND
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Thanh Toán
        </button>
      </div>

      {/* Bảng thông tin đơn hàng */}
      {orderPlaced && (
        <div className="order-wrapper">
          <div className="order-table-container">
            <h3 className="order-title">🎉 Đơn Hàng Của Bạn</h3>

            {/* Thông tin khách hàng */}
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
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString()} VND</td>
                    <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="order-total">
              Tổng cộng: {total.toLocaleString()} VND
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
