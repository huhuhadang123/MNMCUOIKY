import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// ✅ Thay bằng Supabase của bạn
const supabaseUrl = "https://xyzcompany.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("❌ Vui lòng nhập username và password!");
      return;
    }

    setLoading(true);

    try {
      // Kiểm tra username đã tồn tại chưa
      const { data: existingUser } = await supabase
        .from("tbl_user")
        .select("*")
        .eq("username", username)
        .single();

      if (existingUser) {
        alert("❌ Username đã tồn tại!");
        setLoading(false);
        return;
      }

      // Băm mật khẩu
      const password_hash = bcrypt.hashSync(password, 10);

      // Thêm user vào DB
      const { data, error } = await supabase
        .from("tbl_user")
        .insert([{ username, password_hash, fullname, email }]);

      if (error) {
        alert("❌ Lỗi đăng ký: " + error.message);
      } else {
        alert("✅ Đăng ký thành công! Chuyển sang đăng nhập...");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Đăng ký tài khoản</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
