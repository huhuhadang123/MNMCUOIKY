import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/AddToCartPopup.css";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // popup
  const showSuccessPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  // add cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((i) => i.id === product.id);

    if (index !== -1) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    showSuccessPopup();
  };

  // load supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product1")
        .select("id, title, price, image");

      if (error) setError("Không thể tải sản phẩm!");
      else {
        setProducts(data || []);
        setDisplay(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // search + sort
  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      const k = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(k));
    }

    if (sortPrice === "asc") result.sort((a, b) => a.price - b.price);
    if (sortPrice === "desc") result.sort((a, b) => b.price - a.price);

    setDisplay(result);
  }, [search, sortPrice, products]);

  if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <>
      {showPopup && <div className="cart-popup">✔ Đã thêm vào giỏ hàng</div>}

      <div
        style={{
          padding: "60px 40px",
          background: "linear-gradient(180deg, #f7f7f7 0%, #ececec 100%)",
          minHeight: "100vh",
          fontFamily: "Inter, Segoe UI, sans-serif",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Đồng Hồ Chính Hãng
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "40px",
          }}
        >
          Lựa chọn tinh tế cho phong cách của bạn
        </p>

        {/* SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <input
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "360px",
              padding: "14px 16px",
              borderRadius: "999px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            style={{
              width: "220px",
              padding: "14px 16px",
              borderRadius: "999px",
              border: "1px solid #ccc",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            <option value="all">Tất cả sản phẩm</option>
            <option value="asc">Giá thấp → cao</option>
            <option value="desc">Giá cao → thấp</option>
          </select>
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "28px",
          }}
        >
          {display.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                transition: "0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* IMAGE */}
              <div
                onClick={() => navigate(`/ProductDetail/${p.id}`)}
                style={{
                  height: "220px",
                  background: "#f3f3f3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    maxHeight: "80%",
                    transition: "0.3s",
                  }}
                />
              </div>

              {/* INFO */}
              <div style={{ padding: "18px" }}>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  {p.title}
                </h4>

                <p
                  style={{
                    color: "#d32f2f",
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "14px",
                  }}
                >
                  ${p.price}
                </p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => navigate(`/ProductDetail/${p.id}`)}
                    style={{
                      flex: 1,
                      background: "#000",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Xem
                  </button>

                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      flex: 1,
                      background: "#1976d2",
                      color: "#fff",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    🛒
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
