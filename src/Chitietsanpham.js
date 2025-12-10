import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import Supabase client
import "./assets/css/Chitietsanpham.css";

export default function Chitietsanpham() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1") // Đảm bảo bảng sản phẩm là đúng
          .select("id, title, price, image, description, category") // Các trường cần thiết
          .eq("id", id) // Lọc theo id sản phẩm
          .single(); // Chỉ lấy 1 sản phẩm

        if (error) throw error;
        setProduct(data); // Cập nhật sản phẩm
      } catch (err) {
        setError("Không thể tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Gọi lại mỗi khi id thay đổi

  // Nếu đang tải dữ liệu
  if (loading) return <p>Đang tải thông tin sản phẩm...</p>;

  // Nếu có lỗi
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="product-not-found">
        <h3>Không tìm thấy sản phẩm!</h3>
        <button className="back-button" onClick={() => navigate("/")}>
          Quay lại Trang 1
        </button>
      </div>
    );
  }

  // Hàm thêm vào giỏ hàng
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

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

          {/* 🛒 Nút thêm vào giỏ hàng */}
          <button className="add-cart-btn" onClick={addToCart}>
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
