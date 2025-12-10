import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/AddToCartPopup.css"; // ⭐ Thêm file CSS popup

const ListProduct = () => {
  const [listproduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // ⭐ Popup state

  const navigate = useNavigate();

  // ⭐ Hàm hiển thị popup
  const showSuccessPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  // ⭐ Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1; // tăng số lượng nếu đã có
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    showSuccessPopup(); // ⭐ Hiện popup
  };

  // ⭐ Load data từ Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("id, title, price, image");

        if (error) throw error;

        if (data && data.length > 0) {
          setListProduct(data);
        } else {
          setError("Không có dữ liệu sản phẩm!");
        }
      } catch (err) {
        setError("Không thể tải dữ liệu từ Supabase!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <>
      {/* ⭐ Popup thông báo */}
      {showPopup && (
        <div className="cart-popup">
          <i className="fa fa-check-circle"></i> Đã thêm vào giỏ hàng!
        </div>
      )}

      <div
        style={{
          padding: "40px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "32px",
            color: "#333",
          }}
        >
          Sản phẩm nổi bật
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {listproduct.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 20px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
              }}
            >
              <div
                onClick={() => navigate(`/ProductDetail/${p.id}`)}
                style={{
                  height: "200px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    transition: "transform 0.3s",
                  }}
                />
              </div>

              <div style={{ padding: "15px" }}>
                <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>
                  {p.title}
                </h4>

                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#e53935",
                    marginBottom: "15px",
                  }}
                >
                  ${p.price}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "none",
                      borderRadius: "6px",
                      backgroundColor: "#ff5722",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate(`/ProductDetail/${p.id}`)}
                  >
                    Mua ngay
                  </button>

                  <button
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "none",
                      borderRadius: "6px",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    onClick={() => addToCart(p)}
                  >
                    🛒 Thêm giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
