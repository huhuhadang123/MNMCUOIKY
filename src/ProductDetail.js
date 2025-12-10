import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Hàm định dạng giá tiền sang USD
  const formatPrice = (price) => {
    // Chuyển đổi giá trị sang số trước khi định dạng
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) return "N/A";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(numericPrice);
  };

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  // ===== 🛒 ADD TO CART (HOẠT ĐỘNG 100%) =====
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      id: String(product.id),
      title: product.title,
      price: Number(product.price),
      image: product.image,
      quantity: 1,
    };

    const exists = cart.find((p) => p.id === newItem.id);

    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "1.2rem",
          color: "#6c757d",
        }}
      >
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#6c757d",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
          fontSize: "1rem",
          fontWeight: "600",
        }}
      >
        ← Quay lại danh sách
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* Hình ảnh sản phẩm */}
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f7f7f7",
            borderRadius: "15px",
            overflow: "hidden",
            padding: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div style={{ flex: "1 1 450px" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              marginBottom: "15px",
              color: "#343a40",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: "1.8rem",
              color: "#dc3545",
              fontWeight: "bold",
              marginBottom: "20px",
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
            }}
          >
            {/* Đã chỉnh sửa để hiển thị USD */}
            {formatPrice(product.price)}
          </p>

          <div style={{ marginBottom: "25px" }}>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#ffc107",
                fontWeight: "600",
              }}
            >
              ⭐ {product.rating_rate} / 5
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6c757d",
              }}
            >
              ({product.rating_count} đánh giá)
            </p>
          </div>

          <h3
            style={{
              fontSize: "1.2rem",
              color: "#495057",
            }}
          >
            Mô tả sản phẩm
          </h3>

          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.8",
              textAlign: "justify",
              color: "#495057",
              marginBottom: "30px",
            }}
          >
            {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
          </p>

          {/* Nút thêm giỏ hàng */}
          <button
            onClick={addToCart}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "600",
              boxShadow: "0 4px 10px rgba(40, 167, 69, 0.3)",
            }}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
