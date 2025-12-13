import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // UI COLORS (Giữ nguyên)
  const VIBRANT_COLOR_1 = "rgba(0, 150, 255, 0.8)";
  const VIBRANT_COLOR_2 = "rgba(255, 0, 150, 0.8)";
  const GRADIENT_BG = "linear-gradient(135deg, #e0f7fa, #fce4ec)";
  const CARD_BG = "rgba(255, 255, 255, 0.15)";
  const TEXT_COLOR = "#333333";
  const LIGHT_TEXT_COLOR = "#ffffff";
  const ACCENT_COLOR = "#0077b6";

  // UI STYLE (Giữ nguyên)
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: GRADIENT_BG,
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  };

  const sphereStyle = (top, left, color) => ({
    position: "absolute",
    top,
    left,
    width: "300px",
    height: "300px",
    background: color,
    borderRadius: "50%",
    filter: "blur(150px)",
    zIndex: 0,
    opacity: 0.6,
  });

  const cardStyle = {
    maxWidth: "420px",
    width: "100%",
    padding: "40px",
    borderRadius: "20px",
    background: CARD_BG,
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    zIndex: 1,
    color: TEXT_COLOR,
    textAlign: "center",
  };

  const inputStyle = {
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    background: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    outline: "none",
    color: TEXT_COLOR,
  };

  const buttonBaseStyle = {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.2s",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const primaryButtonStyle = {
    ...buttonBaseStyle,
    background: `linear-gradient(45deg, ${ACCENT_COLOR}, #00b4d8)`,
    color: LIGHT_TEXT_COLOR,
  };

  const tabButtonStyle = (active) => ({
    ...buttonBaseStyle,
    flex: 1,
    margin: "0 5px",
    padding: "12px 0",
    background: active ? ACCENT_COLOR : "rgba(255,255,255,0.1)",
    color: active ? LIGHT_TEXT_COLOR : ACCENT_COLOR,
    border: active ? `1px solid ${ACCENT_COLOR}` : "1px solid #ccc",
  });

  // Load user từ localStorage (Giữ nguyên)
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // LOGIN (Đã FIX phần kiểm tra mật khẩu)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        alert("⚠️ Vui lòng nhập Username và Password!");
        return;
      }

      const { data: dbUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (error) throw error;

      if (!dbUser) {
        alert("❌ Tài khoản không tồn tại!");
        return;
      }

      // ✔ CHECK PASSWORD (DẠNG PLAIN TEXT)
      // Đảm bảo cột trong DB là 'password'
      if (dbUser.password !== password) {
        alert("❌ Sai mật khẩu!");
        return;
      }

      // Tạo object user
      const userData = {
        ...dbUser,
        role: dbUser.role || "user",
        isAdmin: dbUser.role === "admin",
      };

      // Xóa password trước khi lưu vào localStorage (Bảo mật cơ bản)
      delete userData.password;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      alert(`🎉 Xin chào ${userData.fullname || userData.username}!`);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER (Đã FIX phần tên cột và logic)
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        alert("⚠️ Vui lòng nhập Username và Password!");
        return;
      }

      const { data: exists } = await supabase
        .from("users")
        .select("id")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (exists) {
        alert("❌ Username đã tồn tại!");
        return;
      }

      // ✔ INSERT USER (SỬ DỤNG CỘT 'password' - ĐỒNG BỘ VỚI DB)
      const { error } = await supabase.from("users").insert([
        {
          username: username.trim().toLowerCase(),
          password: password, // ✅ SỬ DỤNG 'password'
          fullname,
          email,
          role: "user",
        },
      ]);

      if (error) throw error;

      alert("✅ Đăng ký thành công!");
      setTab("login");

      setUsername("");
      setPassword("");
      setFullname("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi đăng ký!");
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT (Giữ nguyên)
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUsername("");
    setPassword("");
    setFullname("");
    setEmail("");
    setTab("login");
    alert("👋 Bạn đã đăng xuất.");
  };

  return (
    <div style={containerStyle}>
      <div style={sphereStyle("10%", "10%", VIBRANT_COLOR_1)} />
      <div style={sphereStyle("70%", "80%", VIBRANT_COLOR_2)} />
      <div style={sphereStyle("50%", "30%", "rgba(255,255,255,0.4)")} />

      <div style={cardStyle}>
        {user ? (
          <>
            <h2 style={{ color: ACCENT_COLOR }}>✨ Đăng nhập thành công!</h2>
            <p>Xin chào {user.fullname || user.username}</p>

            <button
              onClick={handleLogout}
              style={{
                ...primaryButtonStyle,
                background: "linear-gradient(45deg, #e74c3c, #c0392b)",
                marginTop: "25px",
              }}
            >
              👋 ĐĂNG XUẤT
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", marginBottom: "30px" }}>
              <button
                style={tabButtonStyle(tab === "login")}
                onClick={() => setTab("login")}
              >
                ĐĂNG NHẬP
              </button>
              <button
                style={tabButtonStyle(tab === "register")}
                onClick={() => setTab("register")}
              >
                ĐĂNG KÝ
              </button>
            </div>

            <form
              onSubmit={tab === "login" ? handleLogin : handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <input
                type="text"
                placeholder="Username"
                style={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {tab === "register" && (
                <>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    style={inputStyle}
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              )}

              <button style={primaryButtonStyle} disabled={loading}>
                {loading
                  ? "⏳ Đang xử lý..."
                  : tab === "login"
                  ? "ĐĂNG NHẬP"
                  : "TẠO TÀI KHOẢN"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
