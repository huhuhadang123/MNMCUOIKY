import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./data/product"; // lấy đúng 4 sản phẩm nổi bật
import "./assets/css/Chitietsanpham.css";

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === product.id);

    if (exist) exist.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔥 THÊM DÒNG NÀY ĐỂ LAYOUT NHẬN TÍN HIỆU UPDATE GIỎ HÀNG
    window.dispatchEvent(new Event("cartUpdated"));

    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <h3>Không tìm thấy sản phẩm!</h3>
        <button className="back-button" onClick={() => navigate("/")}>
          Quay lại Trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Quay lại
      </button>

      <div className="product-detail">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>

          <p className="product-price">
            <strong>Giá:</strong> ${product.price}
          </p>

          <p className="product-category">
            <strong>Loại:</strong> {product.category}
          </p>

          <p className="product-description">{product.description}</p>

          <button className="add-cart-btn" onClick={addToCart}>
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
