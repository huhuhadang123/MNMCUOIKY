import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";

const ListSanPham = () => {
  const navigate = useNavigate();

  // --- Styles Tối ưu hóa ---

  // Phong cách cơ bản của thẻ sản phẩm (Card)
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #f0f0f0", // Viền nhẹ
    borderRadius: "16px", // Bo góc lớn hơn
    padding: "20px", // Padding thoải mái hơn
    textAlign: "left", // Căn chữ sang trái
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // Shadow tinh tế
    transition:
      "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease", // Transition mượt mà hơn
    cursor: "pointer",
    minHeight: "350px", // Đảm bảo chiều cao tối thiểu cho đồng nhất
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  };

  // Phong cách khi hover
  const cardHover = {
    transform: "translateY(-8px)", // Nảy lên rõ rệt hơn
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)", // Shadow sâu hơn
  };

  // --- Component Render ---

  return (
    <div
      style={{
        padding: "60px 20px", // Tăng padding
        backgroundColor: "#f4f7f6", // Màu nền nhẹ nhàng, ấm áp hơn
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#343a40",
        }}
      >
        🛍️ Danh Sách Sản Phẩm
      </h2>
      <div
        style={{
          display: "grid",
          // Đảm bảo có 3-4 cột trên màn hình lớn
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px", // Tăng khoảng cách giữa các card
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={cardStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, cardHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, cardStyle);
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {" "}
              {/* Bao bọc ảnh và tiêu đề */}
              {/* Hình ảnh sản phẩm */}
              <div
                style={{
                  height: "200px", // Tăng chiều cao khu vực ảnh
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff", // Nền trắng cho ảnh
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "90%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              {/* Tiêu đề sản phẩm */}
              <h4
                style={{
                  fontSize: "1.1rem", // Kích thước chữ vừa phải
                  fontWeight: "600",
                  color: "#343a40",
                  minHeight: "45px", // Đảm bảo đồng nhất chiều cao tiêu đề
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Giới hạn 2 dòng
                  WebkitBoxOrient: "vertical",
                  lineHeight: "1.4",
                  marginBottom: "10px",
                }}
              >
                {p.title}
              </h4>
            </div>

            {/* Giá và Rating/Button (Dưới cùng) */}
            <div
              style={{
                marginTop: "10px",
                borderTop: "1px solid #f0f0f0",
                paddingTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "#dc3545", // Màu đỏ nổi bật cho giá
                  fontWeight: "700",
                  fontSize: "1.4rem", // Giá lớn hơn
                }}
              >
                ${p.price}
              </p>
              <span
                style={{
                  color: "#ffc107", // Màu vàng cho Rating
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {/* Giả sử p có rating.rating_rate */}
                {p.rating && p.rating.rate ? `⭐ ${p.rating.rate}` : "Mới"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSanPham;
