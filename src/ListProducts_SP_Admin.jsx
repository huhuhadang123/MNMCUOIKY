import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import "./assets/css/quanlysp.css";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });

    if (error) console.error("Lỗi:", error.message);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      const { error } = await supabase.from("product1").delete().eq("id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else fetchProducts();
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">📦 Quản lý sản phẩm</h1>
            <p className="admin-subtitle">Danh sách tất cả sản phẩm hiện có</p>
          </div>

          <button
            className="btn-add"
            onClick={() => navigate("/admin/edit/new")}
          >
            ➕ Thêm sản phẩm
          </button>
        </header>

        <div className="table-wrap">
          <table className="prod-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá (USD)</th>
                <th>Đánh giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} alt={p.title} className="product-img" />
                  </td>
                  <td className="prod-name">{p.title}</td>

                  {/* 🔥 GIÁ USD */}
                  <td className="prod-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>

                  <td className="prod-rating">
                    ⭐ {p.rating_rate}{" "}
                    <span className="rating-count">({p.rating_count})</span>
                  </td>

                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/admin/edit/${p.id}`)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="empty">Không có sản phẩm nào.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProducts_SP_Admin;
