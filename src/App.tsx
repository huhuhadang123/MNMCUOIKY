import "./styles.css";

// Import Components
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import ListSanPham from "./ListSanPham";
// @ts-ignore
import ListProduct from "./ListProduct";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";
// @ts-ignore
import GioHang from "./GioHang";
// @ts-ignore
import Lienhe from "./Lienhe";
// @ts-ignore
import DongHoNu from "./DongHoNu";
// @ts-ignore
import Checkout from "./Checkout";
// @ts-ignore
import AboutUs from "./AboutUs";
// Import Routing
// @ts-ignore
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ListSanPham" element={<ListSanPham />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          <Route path="Trang2" element={<Trang2 />} />
          <Route path="ListProducts_SP" element={<ListProducts_SP />} />
          <Route path="ListProduct" element={<ListProduct />} />
          <Route path="ProductDetail/:id" element={<ProductDetail />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="Trang1" element={<Trang1 />} />
          <Route path="GioHang" element={<GioHang />} />
          <Route path="Lienhe" element={<Lienhe />} />
          <Route path="Checkout" element={<Checkout />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route
            path="ListProducts_SP_Admin"
            element={<ListProducts_SP_Admin />}
          />
          <Route path="admin/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
