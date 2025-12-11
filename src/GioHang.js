import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/GioHang.css";

export default function GioHang() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // 🔥 Chuyển giá từ VNĐ → USD nếu giá VNĐ còn sót trong localStorage
  const convertToUSD = (price) => {
    const num = Number(price) || 0;

    // Nếu giá lớn hơn 20,000 thì chắc chắn là VNĐ
    if (num > 20000) {
      return +(num / 25000).toFixed(2); // đổi sang USD
    }

    return +num; // đã là USD
  };

  // 🔥 Load giỏ hàng + convert giá sang USD + ép dữ liệu về đúng dạng
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];

    const fixedCart = saved.map((item) => ({
      ...item,
      price: convertToUSD(item.price), // luôn là USD sau khi convert
      quantity: Number(item.quantity) || 1,
      name: item.name || item.title || "Sản phẩm", // tránh lỗi thiếu name
    }));

    setCart(fixedCart);
  }, []);

  // Lưu lại giỏ hàng + cập nhật giao diện
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
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

  const changeQty = (id, value) => {
    const q = Math.max(1, Number(value) || 1);
    updateCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: q } : item))
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  // 🔥 Format theo USD chuẩn quốc tế
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // 🔥 Tính tổng tiền USD
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
                  <th>Đơn giá (USD)</th>
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
                        alt={item.name}
                        className="item-img"
                      />
                      <span className="item-name">{item.name}</span>
                    </td>

                    <td className="price-col">{formatPrice(item.price)}</td>

                    <td className="qty-col">
                      <div className="qty-control">
                        <button
                          className="qty-btn minus-btn"
                          onClick={() => decreaseQty(item.id)}
                        >
                          -
                        </button>

                        <input
                          type="number"
                          className="qty-input"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => changeQty(item.id, e.target.value)}
                        />

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
