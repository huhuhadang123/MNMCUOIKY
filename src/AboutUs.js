import React from "react";
import "./assets/css/about.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Banner */}
      <div className="about-banner">
        <div className="banner-overlay"></div>
        <h1>VỀ CHÚNG TÔI</h1>
        <p>Store Đồng Hồ Chính Hãng – Uy tín tạo nên thương hiệu</p>
      </div>

      {/* Chúng tôi là ai */}
      <section className="about-section about-flex">
        <div className="about-text">
          <h2>Chúng tôi là ai?</h2>
          <p>
            Store Đồng Hồ là hệ thống cửa hàng chuyên cung cấp đồng hồ chính
            hãng từ các thương hiệu nổi tiếng trên thế giới. Chúng tôi cam kết
            mang đến những sản phẩm chất lượng, thời thượng và bền bỉ dành cho
            mọi khách hàng.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="about us"
          className="about-img"
        />
      </section>

      {/* Sứ mệnh */}
      <section className="about-section about-flex reverse">
        <img
          src="https://images.unsplash.com/photo-1509057199576-632a47484ece"
          alt="mission"
          className="about-img"
        />
        <div className="about-text">
          <h2>Sứ mệnh của chúng tôi</h2>
          <p>
            Mang đến sự tự tin và khẳng định phong cách cho khách hàng thông qua
            những mẫu đồng hồ đẹp, chuẩn chất lượng và giá cả hợp lý nhất.
          </p>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="about-section core-values">
        <h2>Giá trị cốt lõi</h2>
        <ul>
          <li>
            🛡️ 100% đồng hồ <strong>chính hãng</strong> – phát hiện giả hoàn
            tiền 200%
          </li>
          <li>💙 Tư vấn tận tâm – hỗ trợ chuyên nghiệp</li>
          <li>⏱️ Bảo hành rõ ràng – uy tín lâu dài</li>
          <li>🚚 Giao hàng nhanh chóng – kiểm tra trước khi nhận</li>
        </ul>
      </section>

      {/* Lý do chọn chúng tôi */}
      <section className="about-section about-flex">
        <div className="about-text">
          <h2>Lý do bạn nên chọn chúng tôi</h2>
          <p>
            Với nhiều năm kinh nghiệm trong lĩnh vực đồng hồ, Store Đồng Hồ tự
            hào là lựa chọn tin cậy của hàng ngàn khách hàng mỗi năm.
          </p>
          <p>
            Sản phẩm nhập khẩu trực tiếp từ các thương hiệu: Rolex, Casio,
            Orient, Citizen, Tissot, Seiko,… cùng nhiều thương hiệu cao cấp
            khác.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe"
          alt="brands"
          className="about-img"
        />
      </section>

      {/* Thông tin liên hệ */}
      <section className="about-section contact-box">
        <h2>Thông tin liên hệ</h2>
        <p>📍 Địa chỉ: Số 33 đường Vĩnh Viễn, Quận 10, TP.HCM</p>
        <p>📞 Hotline: 0901 234 567</p>
        <p>📧 Email: 23662054@kthcm.edu.vn</p>
      </section>
    </div>
  );
};

export default AboutUs;
