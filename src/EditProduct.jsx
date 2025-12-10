import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/EditProduct.css"; // ⚠️ import CSS mới

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating_rate, setRatingRate] = useState(0);
  const [rating_count, setRatingCount] = useState(0);

  useEffect(() => {
    if (id !== "new") {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          alert("Lỗi: " + error.message);
        } else {
          setTitle(data.title);
          setPrice(data.price);
          setImage(data.image);
          setRatingRate(data.rating_rate);
          setRatingCount(data.rating_count);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id === "new") {
      const { error } = await supabase.from("product1").insert([
        {
          title,
          price,
          image,
          rating_rate,
          rating_count,
        },
      ]);

      if (error) alert("Lỗi thêm mới: " + error.message);
      else navigate("/ListProducts_SP_Admin");
    } else {
      const { error } = await supabase
        .from("product1")
        .update({ title, price, image, rating_rate, rating_count })
        .eq("id", id);

      if (error) alert("Lỗi sửa: " + error.message);
      else navigate("/ListProducts_SP_Admin");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="form-title">
          {id === "new" ? "➕ Thêm sản phẩm mới" : "✏️ Sửa sản phẩm"}
        </h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Link hình ảnh</label>
            <input
              type="text"
              className="input-field"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Đánh giá (rate)</label>
            <input
              type="number"
              className="input-field"
              value={rating_rate}
              onChange={(e) => setRatingRate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Số đánh giá</label>
            <input
              type="number"
              className="input-field"
              value={rating_count}
              onChange={(e) => setRatingCount(e.target.value)}
            />
          </div>

          <div className="button-row">
            <button type="submit" className="btn-primary">
              {id === "new" ? "Thêm mới" : "Lưu thay đổi"}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/ListProducts_SP_Admin")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
