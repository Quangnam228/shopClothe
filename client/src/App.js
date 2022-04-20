import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import { useSelector } from "react-redux";
import Suc from "./pages/Suc";
import Success from "./pages/Success";
import Search from "./pages/Search";
import Messenger from "./pages/messenger/Messenger";
import MyOrder from "./pages/orderMe/MyOrder";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import UpdatePassword from "./pages/profile/UpdatePassword";
import Map from "./components/map/Map";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index path="home" element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="products/:category" element={<ProductList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="suc" element={<Suc />} />
          <Route path="success" element={<Success />} />
          <Route path="messenger" element={user ? <Messenger /> : <Login />} />
          <Route path="myOrder" element={user ? <MyOrder /> : <Login />} />
          <Route path="account" element={user ? <Profile /> : <Login />} />
          <Route path="map" element={<Map />} />

          <Route
            path="/users/update/:id"
            element={user ? <UpdateProfile /> : <Login />}
          />
          <Route
            path="password/update/:id"
            element={user ? <UpdatePassword /> : <Login />}
          />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route
            path="login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="register"
            element={user ? <Navigate to="/home" /> : <Register />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
