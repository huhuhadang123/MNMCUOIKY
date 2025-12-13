import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

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
      // 1️⃣ CHECK USERNAME
      const { data: exists, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (checkError) throw checkError;

      if (exists) {
        alert("❌ Username đã tồn tại!");
        return;
      }

      // 2️⃣ INSERT USER (SỬ DỤNG CỘT 'password' - ĐỒNG BỘ VỚI DB VÀ LOGIN)
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

      alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi đăng ký!");
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

          <button disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
