import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import LoginForm from "./pages/LoginForm";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/home" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="products/:category" element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
