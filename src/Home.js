import React, { useState, useEffect } from "react";
import "./css/main.css";
import { useNavigate } from "react-router-dom";
import ListProduct from "./ListProduct";

// Banner
import banner1 from "./assets/images/dhnam.avif";
import banner2 from "./assets/images/STUHRLING.jpg";
import banner3 from "./assets/images/dhcaocap.jpg";

// Product images
import watchImage1 from "./assets/images/Huboler.jpg";
import watchImage2 from "./assets/images/KOI.avif";
import watchImage3 from "./assets/images/CITIZEN.avif";
import watchImage4 from "./assets/images/CASIO.avif";

import "./assets/css/AddToCartPopup.css";

const Home = () => {
  const banners = [banner1, banner2, banner3];
  const [index, setIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState("next");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3500);
    return () => clearTimeout(timer);
  }, [index]);

  const nextSlide = () => {
    setAnimDirection("next");
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setAnimDirection("prev");
    setIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToSlide = (i) => {
    setAnimDirection(i > index ? "next" : "prev");
    setIndex(i);
  };

  const products = [
    { id: 1, name: "Đồng Hồ Huboler", price: 6450000, image: watchImage1 },
    {
      id: 2,
      name: "Koi K001.403.642.05.01.01",
      price: 2130000,
      image: watchImage2,
    },
    {
      id: 3,
      name: "Citizen Eco-Drive BM7620-83L",
      price: 8385000,
      image: watchImage3,
    },
    {
      id: 4,
      name: "Casio Edifice ECB-S10DB",
      price: 7612000,
      image: watchImage4,
    },
  ];

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === product.id);

    if (exist) exist.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div className="home-page">
      <h1 className="title">⌚ Store Đồng Hồ Chính Hãng ⌚</h1>

      {/* Banner */}
      <div className="slideshow-container">
        <button className="arrow left" onClick={prevSlide}>
          ❮
        </button>

        <div className="slide-frame">
          {banners.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Banner quảng cáo"
              className={`slide-image ${i === index ? "active" : ""} ${
                animDirection === "next" ? "slide-next" : "slide-prev"
              }`}
            />
          ))}
        </div>

        <button className="arrow right" onClick={nextSlide}>
          ❯
        </button>

        <div className="indicator-container">
          {banners.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              className={`indicator-dot ${i === index ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>

      <h2 className="section-title">✨ Đồng Hồ Nổi Bật ✨</h2>

      <div className="product-list">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="product-image-wrapper">
              <img src={item.image} alt={item.name} />
            </div>

            <h3>{item.name}</h3>
            <p className="price">{item.price.toLocaleString()}₫</p>

            {/* Nút được làm đẹp hoàn toàn */}
            <div className="product-buttons">
              <button
                className="btn-buy-modern"
                onClick={() => navigate(`/sanpham/${item.id}`)}
              >
                <i className="fa fa-shopping-bag"></i> Mua ngay
              </button>

              <button
                className="btn-add-cart-modern"
                onClick={() => addToCart(item)}
              >
                <i className="fa fa-cart-plus"></i> Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="cart-popup">
          <i className="fa fa-check-circle"></i> Đã thêm vào giỏ hàng!
        </div>
      )}

      <ListProduct />
    </div>
  );
};

export default Home;
