import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/AddToCartPopup.css";

// ⭐ Ảnh sản phẩm nổi bật (cùng ảnh với Home)
import watchImage1 from "./assets/images/Huboler.jpg";
import watchImage2 from "./assets/images/KOI.avif";
import watchImage3 from "./assets/images/CITIZEN.avif";
import watchImage4 from "./assets/images/CASIO.avif";

const ListProduct = () => {
  const [products, setProducts] = useState([]); // ⭐ Tất cả sản phẩm
  const [display, setDisplay] = useState([]); // ⭐ Sản phẩm sau lọc search
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // ⭐ Popup
  const showSuccessPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  // ⭐ Add cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    showSuccessPopup();
  };

  // ⭐ Sản phẩm nổi bật (gộp vào ListProduct)
  const featuredProducts = [];

  // ⭐ Sản phẩm mặc định tự thêm (nếu cần)
  const defaultProducts = [];

  // ⭐ Load Supabase + Gộp tất cả sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // load supabase
        const { data, error } = await supabase
          .from("product1")
          .select("id, title, price, image");

        if (error) throw error;

        let allProducts = [...featuredProducts, ...defaultProducts];

        if (data) {
          allProducts = [
            ...allProducts,
            ...data.map((item) => ({
              id: item.id,
              title: item.title,
              price: item.price,
              image: item.image,
            })),
          ];
        }

        setProducts(allProducts);
        setDisplay(allProducts);
      } catch {
        setError("Không thể tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ⭐ Tìm kiếm tổng hợp tất cả sản phẩm
  useEffect(() => {
    const keyword = search.toLowerCase();

    const result = products.filter((p) =>
      p.title.toLowerCase().includes(keyword)
    );

    setDisplay(result);
  }, [search, products]);

  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>;

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <>
      {/* ⭐ Popup */}
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
            marginBottom: "20px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Tất Cả Sản Phẩm
        </h2>

        {/* ⭐ Ô tìm kiếm */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "60%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #aaa",
              fontSize: "16px",
            }}
          />
        </div>

        {/* ⭐ Danh sách sản phẩm */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {display.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              ❌ Không tìm thấy sản phẩm!
            </p>
          ) : (
            display.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                  transition: "0.2s",
                }}
              >
                <div
                  onClick={() => navigate(`/ProductDetail/${p.id}`)}
                  style={{
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </div>

                <div style={{ padding: "15px" }}>
                  <h4 style={{ marginBottom: "10px" }}>{p.title}</h4>

                  <p style={{ fontWeight: "bold", color: "#e53935" }}>
                    ${p.price}
                  </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={{
                        flex: 1,
                        background: "#ff5722",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "6px",
                      }}
                      onClick={() => navigate(`/ProductDetail/${p.id}`)}
                    >
                      Mua ngay
                    </button>

                    <button
                      style={{
                        flex: 1,
                        background: "#1976d2",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "6px",
                      }}
                      onClick={() => addToCart(p)}
                    >
                      🛒 Thêm
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
