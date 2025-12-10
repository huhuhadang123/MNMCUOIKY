import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/GioHang.css";

export default function GioHang() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(
      saved.map((item) => ({
        ...item,
        price: item.price || 0,
        quantity: item.quantity || 1,
      }))
    );
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // BẮT BUỘC có để Layout cập nhật số lượng
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // 🔥 Cho phép nhập số lượng tùy ý
  const changeQty = (id, value) => {
    const quantity = Math.max(1, Number(value) || 1);
    updateCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="cart-title">🛒 Giỏ hàng của bạn ({cart.length} SP)</h2>
      </div>

      {cart.length === 0 ? (
        <h3 className="empty-cart">Giỏ hàng trống! Hãy mua ngay nhé ❤️</h3>
      ) : (
        <>
          <div className="cart-table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr className="cart-item-row" key={item.id}>
                    <td className="product-col">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="item-img"
                      />
                      <span className="item-name">{item.title}</span>
                    </td>

                    <td className="price-col">{formatPrice(item.price)}</td>

                    <td className="qty-col">
                      <div className="qty-control">
                        {/* NÚT GIẢM */}
                        <button
                          className="qty-btn minus-btn"
                          onClick={() => decreaseQty(item.id)}
                        >
                          -
                        </button>

                        {/* 🔥 Ô INPUT NHẬP SỐ LƯỢNG */}
                        <input
                          type="number"
                          className="qty-input"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => changeQty(item.id, e.target.value)}
                        />

                        {/* NÚT TĂNG */}
                        <button
                          className="qty-btn plus-btn"
                          onClick={() => increaseQty(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="total-col">
                      {formatPrice(item.price * item.quantity)}
                    </td>

                    <td className="remove-col">
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-footer">
            <button
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              — Tiếp tục mua hàng
            </button>

            <div className="cart-summary">
              <p className="total-text">
                Tổng cộng:{" "}
                <span className="final-total">{formatPrice(total)}</span>
              </p>
              <button className="pay-btn" onClick={() => navigate("/Checkout")}>
                Thanh toán ngay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
