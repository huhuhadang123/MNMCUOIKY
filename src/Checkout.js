import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
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

  const navigate = useNavigate(); // Hook để điều hướng

  // 🔥 Convert giá nếu còn VNĐ
  const convertToUSD = (price) => {
    const num = Number(price) || 0;
    if (num > 20000) return +(num / 25000).toFixed(2); // VNĐ → USD
    return +num; // đã là USD
  };

  // 🔥 Format USD
  const formatUSD = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const fixedCart = savedCart.map((item) => ({
      ...item,
      price: convertToUSD(item.price),
      quantity: Number(item.quantity) || 1,
      name: item.name || item.title || "Sản phẩm",
    }));

    setCart(fixedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!customerName.trim()) return alert("Vui lòng nhập tên khách hàng!");
    if (!address.trim()) return alert("Vui lòng nhập địa chỉ giao hàng!");
    if (!email.trim()) return alert("Vui lòng nhập email!");
    if (!paymentMethod) return alert("Vui lòng chọn phương thức thanh toán!");
    if (!bank) return alert("Vui lòng chọn ngân hàng!");

    setOrderPlaced(true);
    // Chuyển hướng đến trang đơn hàng và truyền thông tin đơn hàng qua state
    navigate("/order", {
      state: {
        cart,
        customerName,
        address,
        email,
        paymentMethod,
        bank,
        total,
      },
    });
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
          placeholder="33 Vĩnh Viễn"
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
              value="Credit Card"
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

        {/* 🔥 Tổng tiền USD */}
        <div className="checkout-total">
          Tổng tiền: <strong>{formatUSD(total)}</strong>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Thanh Toán
        </button>
      </div>
    </div>
  );
}
