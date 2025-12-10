import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Ensure supabaseClient is set up correctly

const Trang1 = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1") // Replace with your actual table name
          .select("id, title, price, image");

        if (error) throw error; // Handle any errors
        if (data && data.length > 0) {
          setProducts(data); // Set the products data
          setFilteredProducts(data); // Initially, show all products
        } else {
          setError("Không có sản phẩm nào!");
        }
      } catch (err) {
        setError("Không thể tải sản phẩm từ Supabase!");
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchProducts(); // Fetch the products on mount
  }, []);

  // Handle search term input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    // Filter products based on search term
    if (searchValue.trim() === "") {
      setFilteredProducts(products); // Show all products if search term is empty
    } else {
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase()) // Case-insensitive search
      );
      setFilteredProducts(filtered); // Update the filtered products
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải sản phẩm...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}
      >
        Danh sách sản phẩm
      </h2>

      {/* Tìm kiếm sản phẩm */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)} // Navigate to product detail page
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                height: "140px",
                objectFit: "contain",
                maxWidth: "100%",
                transition: "transform 0.3s",
              }}
            />
            <h4 style={{ fontSize: "16px", margin: "10px 0" }}>{p.title}</h4>
            <p
              style={{ color: "#e53935", fontWeight: "bold", fontSize: "18px" }}
            >
              ${p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trang1;
