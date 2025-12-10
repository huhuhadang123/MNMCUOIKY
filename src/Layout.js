import { useEffect, useState } from "react";
import "./assets/css/layout.css";
import "./assets/css/chatAI.css";
import logo from "./assets/images/logohaidang.jpg";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // lấy user từ localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // load cart
  const loadCartCount = () => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    const count = saved.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    loadCartCount();
    window.addEventListener("cartUpdated", loadCartCount);
    return () => window.removeEventListener("cartUpdated", loadCartCount);
  }, []);

  // ---------------------------------------------
  // 🔥 CHAT AI FIX API — CHẠY 100%
  // ---------------------------------------------
  useEffect(() => {
    const openBtn = document.getElementById("openChat");
    const closeBtn = document.getElementById("closeChat");
    const chatBox = document.querySelector(".chatbot-container");

    const sendBtn = document.getElementById("sendChat");
    const chatInput = document.getElementById("chatInput");
    const chatBody = document.getElementById("chatBody");

    if (!openBtn || !closeBtn || !chatBox) return;

    // mở chat
    openBtn.onclick = () => {
      chatBox.style.display = "flex";
      openBtn.style.display = "none";
    };

    // đóng chat
    closeBtn.onclick = () => {
      chatBox.style.display = "none";
      openBtn.style.display = "block";
    };

    // gửi tin nhắn
    sendBtn.onclick = async () => {
      const text = chatInput.value.trim();
      if (!text) return;

      chatBody.innerHTML += `<div class="msg user-msg"><b>Bạn:</b> ${text}</div>`;
      chatInput.value = "";

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "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", // 🔥 thay API KEY vào đây
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "Bạn là trợ lý AI của cửa hàng đồng hồ Haidang.",
              },
              { role: "user", content: text },
            ],
            temperature: 0.7,
          }),
        });

        const data = await res.json();

        const reply =
          data?.choices?.[0]?.message?.content ||
          "Xin lỗi, Haidang AI đang gặp lỗi API!";

        chatBody.innerHTML += `<div class="msg ai-msg"><b>Haidang AI:</b> ${reply}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
      } catch (error) {
        chatBody.innerHTML += `<div class="msg ai-msg"><b>Haidang AI:</b> Không thể kết nối API!</div>`;
      }
    };
  }, []);

  // ---------------------------------------------

  return (
    <>
      <header id="header" className="header">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          crossOrigin="anonymous"
        />

        <div>
          {/* TOP BAR */}
          <div id="topbar" className="topbar">
            <nav id="topnav">
              <ul className="topnav-list">
                <li>
                  <a className="nav-link cart-link" href="/giohang">
                    <i className="fa-solid fa-cart-plus"></i>
                    <span className="cart-count">{cartCount}</span>
                  </a>
                </li>

                {user?.role === "admin" && (
                  <li>
                    <a
                      className="nav-link admin-link"
                      href="/ListProducts_SP_Admin"
                    >
                      QUẢN LÝ SẢN PHẨM
                    </a>
                  </li>
                )}

                <li>
                  <a className="nav-link login-link" href="/LoginPage">
                    <i className="fas fa-user"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* BANNER */}
          <div id="banner" className="banner">
            <div className="logo-container">
              <a href="/">
                <img src={logo} alt="Logo" className="logo" />
              </a>
            </div>

            {/* MENU */}
            <div id="divmenutrai">
              <nav id="menutrai">
                <ul className="menutrai">
                  <li className="menutrai-list__item">
                    <a href="/" className="menutrai-link">
                      TRANG CHỦ
                    </a>
                  </li>

                  <li className="menutrai-list__item menu-has-child">
                    <a className="menutrai-link" href="/trang1">
                      SẢN PHẨM
                    </a>
                  </li>

                  <li className="menutrai-list__item">
                    <a className="menutrai-link" href="/Lienhe">
                      Liên Hệ
                    </a>
                  </li>

                  <li className="menutrai-list__item">
                    <a className="menutrai-link" href="/AboutUs">
                      Giới Thiệu
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* SEARCH BOX */}
            <div className="search-container">
              <form className="search-form">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="outlet-container">
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer className="footer-clothing">
        <div className="footer-container">
          <div className="footer-section info">
            <h3>Store Đồng Hồ Chính Hãng</h3>
            <p>
              Cung cấp Đồng Hồ & Phụ Kiện cao cấp từ các thương hiệu hàng đầu.
              Cam kết chính hãng & bảo hành đầy đủ.
            </p>
          </div>

          <div className="footer-section contact">
            <h3>Liên hệ</h3>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i> số 33 đường Vĩnh Viễn,
                Quận 10, TP.HCM
              </li>
              <li>
                <i className="fas fa-phone"></i> 0901 234 567
              </li>
              <li>
                <i className="fas fa-envelope"></i> 23662054@kthcm.edu.vn
              </li>
            </ul>
          </div>

          <div className="footer-section links">
            <h3>Hỗ trợ</h3>
            <ul>
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li>
                <a href="/trang1">Sản Phẩm</a>
              </li>
              <li>
                <a href="/Listsanpham">Danh Sách Sản Phẩm</a>
              </li>
              <li>
                <a href="/AboutUs">Giới Thiệu</a>
              </li>
            </ul>
          </div>

          <div className="footer-section categories">
            <h3>Danh mục</h3>
            <ul>
              <li>
                <a href="/dongho-nam">Đồng hồ Nam</a>
              </li>
              <li>
                <a href="/dongho-nu">Đồng hồ Nữ</a>
              </li>
              <li>
                <a href="#">Phụ kiện</a>
              </li>
              <li>
                <a href="#">Thương hiệu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Store Đồng Hồ. Thiết kế bởi Đăng 💙</p>
        </div>
      </footer>

      {/* 🔥 CHAT AI UI */}
      <div className="chatbot-container">
        <div className="chatbot-header">
          <span>Haidang AI Chat</span>
          <button id="closeChat">✖</button>
        </div>

        <div className="chatbot-body" id="chatBody"></div>

        <div className="chatbot-input">
          <input id="chatInput" type="text" placeholder="Nhập tin nhắn..." />
          <button id="sendChat">Gửi</button>
        </div>
      </div>

      <button className="chatbot-open" id="openChat">
        💬
      </button>
    </>
  );
};

export default Layout;
