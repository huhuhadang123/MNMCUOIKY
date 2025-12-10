import React from "react"; // Nên thêm import React khi sử dụng JSX

// Định nghĩa bảng màu và hằng số
const colors = {
  primary: "#4299e1", // Blue-400
  secondary: "#48bb78", // Green-500
  background: "#f7fafc", // Gray-50
  cardBackground: "#ffffff",
  textPrimary: "#2d3748", // Gray-800
  textSecondary: "#718096", // Gray-600
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowHover: "rgba(0, 0, 0, 0.15)",
};

// Định nghĩa styles (CSS-in-JS)
const styles = {
  mainContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.background,
    padding: "60px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  studentGrid: {
    display: "grid",
    // Điều chỉnh minmax để thẻ không quá nhỏ
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px", // Tăng khoảng cách giữa các thẻ
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto", // Canh giữa lưới
  },

  // **Cập nhật Card với pseudo-class :hover (yêu cầu xử lý trong component)**
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "25px 20px",
    border: `1px solid ${colors.background}`, // Thêm viền nhẹ
    borderRadius: "16px", // Bo góc mềm mại hơn
    backgroundColor: colors.cardBackground,
    boxShadow: `0 8px 18px ${colors.shadow}`, // Bóng đổ đẹp hơn
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },

  avatar: {
    width: "130px", // Kích thước lớn hơn
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
    border: `5px solid ${colors.primary}`, // Viền nổi bật hơn
    boxShadow: `0 0 15px ${colors.primary}40`, // Hiệu ứng sáng
  },
  name: {
    fontSize: "1.5rem", // Lớn hơn
    margin: "8px 0 5px 0",
    fontWeight: "700", // Đậm hơn
    color: colors.textPrimary,
    textAlign: "center",
  },
  info: {
    margin: "3px 0",
    fontSize: "1rem", // Rõ ràng hơn
    color: colors.textSecondary,
    // Căn giữa thông tin
    textAlign: "center",
  },
  infoStrong: {
    fontWeight: "600",
    color: colors.textPrimary,
  },
  title: {
    textAlign: "center",
    color: colors.textPrimary,
    marginBottom: "40px",
    fontSize: "2.5rem", // Tiêu đề lớn và ấn tượng
    fontWeight: "800",
    textTransform: "uppercase", // Chữ hoa
    letterSpacing: "2px",
    borderBottom: `3px solid ${colors.primary}`,
    paddingBottom: "10px",
  },
};

// Component con để hiển thị thông tin một sinh viên
const StudentCard = ({ motsinhvien }) => {
  // Logic xử lý hover cho CSS-in-JS
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyle = {
    ...styles.card,
    ...(isHovered && {
      transform: "translateY(-8px) scale(1.02)", // Nâng và phóng to nhẹ
      boxShadow: `0 15px 30px ${colors.shadowHover}`, // Bóng đổ lớn hơn khi hover
      border: `1px solid ${colors.primary}`,
    }),
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Thêm tabindex để hỗ trợ người dùng dùng bàn phím
      tabIndex="0"
    >
      <img
        src={motsinhvien.anh}
        alt={motsinhvien.hoten}
        style={styles.avatar}
      />
      <h3 style={styles.name}>{motsinhvien.hoten}</h3>
      <p style={styles.info}>
        <span style={styles.infoStrong}>Lớp:</span> {motsinhvien.lop}
      </p>
      <p style={styles.info}>
        <span style={styles.infoStrong}>Email:</span> {motsinhvien.email}
      </p>
    </div>
  );
};

// Component chính
const Trang2 = () => {
  const dssv = [
    {
      id: 1,
      hoten: "Nguyễn Văn An",
      lop: "K19 - CNTT",
      email: "an.nguyen@edu.vn",
      anh: "https://htmediagroup.vn/wp-content/uploads/2022/11/Anh-58-copy-min.jpg.webp",
    },
    {
      id: 2,
      hoten: "Trần Văn Bình",
      lop: "K19 - MKT",
      email: "binh.tran@edu.vn",
      anh: "https://htmediagroup.vn/wp-content/uploads/2022/08/Anh-cong-so-1-min.jpg.webp",
    },
    {
      id: 3,
      hoten: "Hà Thị Hiền",
      lop: "K19 - QTKD",
      email: "hien.ha@edu.vn",
      anh: "https://smilemedia.vn/wp-content/uploads/2022/08/Concept-chup-anh-ca-nhan-chan-dung.jpg",
    },
    {
      id: 4,
      hoten: "Nguyễn Kiều My",
      lop: "K19 - KT",
      email: "my.nguyen@edu.vn",
      anh: "https://studiochupanhdep.com//Upload/Images/Album/anh-beauty-01.jpg",
    },
  ];

  return (
    <div style={styles.mainContainer}>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={styles.title}>🎓 Danh Sách Sinh Viên Ưu Tú</h2>
        <div style={styles.studentGrid}>
          {dssv.map((motsinhvien) => (
            <StudentCard key={motsinhvien.id} motsinhvien={motsinhvien} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trang2;
