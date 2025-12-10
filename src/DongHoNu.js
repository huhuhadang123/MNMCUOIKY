import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Kết nối với Supabase

const DongHoNu = () => {
  const [products, setProducts] = useState([]);

  // Hàm lấy sản phẩm đồng hồ nữ từ Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product1")
        .select("id, title, price, image")
        .eq("category", "dongho-nu"); // Giả sử bạn có trường 'category' trong Supabase

      if (error) {
        console.log("Error fetching products: ", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Đồng Hồ Nữ</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <h3>{product.title}</h3>
            <p>{product.price} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DongHoNu;
