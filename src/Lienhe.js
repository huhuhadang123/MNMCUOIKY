import { useState } from "react";
import "./assets/css/Lienhe.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ liên hệ lại với bạn sớm!");
    // Xử lý gửi form tại đây (ví dụ gửi email hoặc API)
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</p>
      </div>

      <div className="contact-info">
        <h2>Thông Tin Liên Hệ</h2>
        <ul>
          <li>
            <i className="fas fa-map-marker-alt"></i> Số 33, Đường Vĩnh Viễn,
            Quận 10, TP.HCM
          </li>
          <li>
            <i className="fas fa-phone"></i> 0901 234 567
          </li>
          <li>
            <i className="fas fa-envelope"></i> 23662054@kthcm.edu.vn
          </li>
          <li>
            <i className="fas fa-clock"></i> Giờ mở cửa: 8:00 AM - 6:00 PM (T2 -
            T7)
          </li>
        </ul>
      </div>

      <div className="contact-form">
        <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ và tên"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Lời nhắn"
            required
          ></textarea>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
